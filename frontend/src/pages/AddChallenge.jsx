import { fetchCreateChallenge } from "../apis/challenge";
import { useId } from "react";
import { useState } from "react";
import Button from "../components/Button";
import Cookies from "js-cookie";
import Datepicker from "react-tailwindcss-datepicker";
import { useNavigate } from "react-router";
import { useEffect } from "react";

const NEXT_MONTH = new Date();
NEXT_MONTH.setMonth(NEXT_MONTH.getMonth() + 1);

const initialErrorState = {
  title: "",
  description: "",
  date: "",
  api: "",
};

// function AddChallenge() {
const AddChallenge = () => {
  const postTextAreaId = useId();
  const [title, setTitle] = useState("");
  const [errors, setErrors] = useState(initialErrorState);
  const [currentDate, setCurrentDate] = useState({
    startDate: new Date(),
    endDate: NEXT_MONTH,
  });
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const jwt = Cookies.get("jwt");
    console.log("jwt:" + jwt);
    if (jwt == undefined) {
      navigate("/login");
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Form submitted");
    let newErrors = {};
    if (description.length == 0) {
      newErrors = { ...newErrors, description: "Description cannot be empty" };
    }

    if (title.length == 0) {
      newErrors = { ...newErrors, title: "Title cannot be empty" };
    }

    if (currentDate.startDate > currentDate.endDate) {
      newErrors = {
        ...newErrors,
        date: "Start date cannot be greater than end date",
      };
    }

    if (currentDate.endDate == null || currentDate.startDate == null) {
      newErrors = {
        ...newErrors,
        date: "Start date and end date cannot be empty",
      };
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const data = {
      challenge: {
        title: title,
        description: description,
        start_date: currentDate.startDate,
        end_date: currentDate.endDate,
      },
    };
    const [challengeResponse, error] = await fetchCreateChallenge(
      Cookies.get("jwt"),
      data
    );
    console.log("challengeResponse:" + challengeResponse);
    console.log("Error:" + error);
    if (error) {
      newErrors = { ...newErrors, api: error.toString() };
      setErrors(newErrors);
      //   navigate("/");
    } else {
      navigate(`/challenges/${challengeResponse.id}`);
      //   if (cookieValue !== undefined) {
      //     navigate("/");
      //   } else {
      //     navigate("/login");
      //   }
    }
    // setErrors(newErrors);
    // if (Object.keys(newErrors).length > 0) return;
  };

  const onDescriptionChange = (event) => {
    event.preventDefault();
    setDescription(event.target.value);
    console.log(description);
  };

  return (
    <div>
      <div className="bg-white">
        <div className="mt-auto max-w-7xl px-2 sm:px-6 lg:px-8 py-2">
          <h1>This is Add Chalenge page</h1>
          <h3 className="text-xl font-bold">Challenges</h3>
          <form className="">
            {/* max-w-7xl px-2 py-2 sm:px-6 lg:px-8 */}
            <input
              className="mt-10 text-black py-2 w-full border border-gray-600 ronded px-3"
              type="text"
              value={title}
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
            />
            {errors.title && (
              <p className="text-sm text-medium text-red-500 mt-1">
                {errors.title}
              </p>
            )}
            <Datepicker
              className="mt-10"
              value={currentDate}
              displayFormat="DD/MM/YYYY"
              onChange={(newValue) => setCurrentDate(newValue)}
              //   showShortcuts={true}
            />
            {errors.date && (
              <p className="text-sm text-medium text-red-500 mt-1">
                {errors.date}
              </p>
            )}
            <label htmlFor={postTextAreaId}>Description:</label>
            <textarea
              id={postTextAreaId}
              name="description"
              rows={4}
              cols={40}
              value={description}
              onChange={onDescriptionChange}
            />
            {errors.description && (
              <p className="text-sm text-medium text-red-500 mt-1">
                {errors.description}
              </p>
            )}
            <div></div>

            <Button onClick={handleSubmit}>Add Challenge</Button>
            {errors.api && (
              <p className="text-sm text-medium text-red-500 mt-1">
                {errors.api}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddChallenge;
