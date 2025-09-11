import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";
// import "./ChallengeDetails.css";
import {
  fetchDeleteChallenge as fetchDeleteChallenge_by_id,
  fetchChallenge as fetchChallenge_by_id,
} from "../apis/challenge";
import Button from "../components/Button";

function ChallengeDetails() {
  const { id } = useParams(); // ✅ pega o id da URL
  const [challenge, setChallenge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fechCurrentChallenge = async () => {
      try {
        // const response = await fetch("${API_URL}/${id}");
        // const response = await fetch(`${API_URL}/${id}`); // ✅ usa id aqui
        // if (response.ok) {
        //   const json = await response.json();
        //   setPost(json);
        // } else {
        //   throw response;
        // }
        const [json, error] = await fetchChallenge_by_id(
          Cookies.get("jwt"),
          id
        );
        if (error) {
          setError(error);
          return;
        }
        setChallenge(json);
      } catch (e) {
        setError("Error occurred..." + e);
        console.log("Error occurred..." + e);
      } finally {
        setLoading(false);
      }
    };
    fechCurrentChallenge();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!challenge) return <p>Challenge not found</p>;

  const deleteChallenge = async (id) => {
    try {
      // Delete the challenge from the server using a DELETE request http://localhost:3000/api/v1challenges/:id
      // await fetch(`${API_URL}/${id}`, {
      //   method: "DELETE",
      // });
      await fetchDeleteChallenge_by_id(id);
      navigate(`/`);
    } catch (e) {
      setError("Error occurred..." + e);
      console.error("Error occurred..." + e);
    }
  };

  return (
    <div className="bg-white">
      <div className="mt-auto max-w-7xl px-2 sm:px-6 lg:px-8 py-2">
        <h1 className="text-xl font-bold">This is Chalenge page</h1>
        <h2>{challenge.id}</h2>
        <h2>{challenge.title}</h2>
        <div>
          {/* {challenge.image_url && (
          <img src={challenge.image_url} alt={challenge.title} className="challenge-image" />
        )} */}
        </div>
        <p>{challenge.description}</p>
        <Link to="/"> Back to challenges </Link>
        {" | "}
        {/* <Link to={`/challenges/${challenge.id}/edit`}> Edit challenge </Link> */}
        {" | "}
        <button
          onClick={() => deleteChallenge(challenge.id)}
          style={{ color: "red" }}
        >
          Delete challenge{"1 "}
        </button>
        <button onClick={deleteChallenge}>Delete 2</button>
        <Button onClick={deleteChallenge}>Delete 3</Button>
      </div>
    </div>
  );
}

export default ChallengeDetails;
