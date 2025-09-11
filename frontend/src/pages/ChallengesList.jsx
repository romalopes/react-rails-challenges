import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchAllChallenges, fetchDeleteChallenge } from "../apis/challenge";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";
import Button from "../components/Button";

function ChallengeList() {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const jwt = Cookies.get("jwt");
    console.log("jwt:" + jwt);
    if (jwt == undefined) {
      navigate("/login");
      return;
    }
    async function loadChallenges() {
      try {
        const [data, error] = await fetchAllChallenges(Cookies.get("jwt"));
        if (error) {
          setError(error);
          return;
        }
        console.log(data);
        setChallenges(data);
      } catch (e) {
        setError("Error occurred..." + e);
        console.log("Error occurred..." + e);
      } finally {
        setLoading(false);
      }
    }
    loadChallenges();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!challenges) return <p>No challenges</p>;

  const deleteChallenge = async (id) => {
    try {
      console.log(id);
      await fetchDeleteChallenge(Cookies.get("jwt"), id);
      setChallenges((prevChallenges) =>
        prevChallenges.filter((challenge) => challenge.id !== id)
      );
    } catch (e) {
      setError("Error occurred..." + e);
      console.error("Error occurred..." + e);
    }
  };

  return (
    <div className="bg-white">
      <div className="mt-auto max-w-7xl px-2 sm:px-6 lg:px-8 py-2">
        <h1 className="text-xl font-bold">
          This is Chalenge page - {challenges.length}
        </h1>
        {challenges.map((challenge) => (
          <div key={challenge.id} className="challenge-container">
            <h2>
              <Link to={`/challenges/${challenge.id}`}>
                {challenge.id} - {challenge.title}
              </Link>
            </h2>
            {/* <div>
            {challenge.image_url ? (
              // {challenge.image_url && (
              <img
                src={challenge.image_url}
                alt={challenge.title}
                className="challenge-image"
              />
            ) : (
              <div className="challenge-imag-stub" />
            )}
          </div> */}
            <div className="challenge-links">
              <Link to={`/challenges/${challenge.id}/edit`}>
                {" "}
                Edit challenge{" "}
              </Link>
              <button onClick={() => deleteChallenge(challenge.id)}>
                Delete Challenge
              </button>
            </div>
            {/* <Button onClick={deleteChallenge(challenge.id)}>Delete 3</Button> */}
            <p>{challenge.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChallengeList;
