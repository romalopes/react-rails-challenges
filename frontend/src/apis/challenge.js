import { BASE_API } from "./constants";

function checkJwt(jwt) {
  if (jwt === undefined) {
    console.log("jwt is undefined");
    return false;
  } else {
    console.log("jwt is defined");
    return true;
  }
}

const fetchCreateChallenge = async (jwt, data) => {
  try {
    if (!checkJwt(jwt) || jwt === undefined) {
      return ["", "jwt is undefined"];
    }
    // Make the API call
    const response = await fetch(BASE_API + "/challenges", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: jwt === undefined ? "" : jwt, //"Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(data),
    });

    // Handle the response
    if (response.ok) {
      console.log(
        "heard Authentication:" + response.headers.get("Authorization")
      );

      const result = await response.json();
      console.log(response);
      console.log(result);

      return [result, null];
    } else {
      const result = await response.json();
      console.log(response);
      console.log(result);
      if (response.status === 401) {
        return ["", "Unauthorized User - 401"];
      }
      if (response.status === 422 || response.status === 400) {
        console.log(result);
        return ["", "Unauthorized User - 422 or 400"];
      }
      return ["", result.error];
    }
  } catch (error) {
    console.log(error);
    return ["Server Side Error:", error];
  }
};

const fetchDeleteChallenge = async (jwt, id) => {
  try {
    if (!checkJwt(jwt) || jwt === undefined) {
      return ["", "jwt is undefined"];
    }
    // Make the API call
    const response = await fetch(`${BASE_API}/challenges/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: jwt === undefined ? "" : jwt, //"Bearer " + localStorage.getItem("token"),
      },
    });

    console.log(response);
    // Handle the response
    if (response.ok) {
      // const result = await response.json();
      // console.log(response);
      // console.log(result);
      return [response.ok, null];
    } else {
      // const result = await response.json();
      // console.log(response);
      // console.log(result);
      if (response.status === 401) {
        return ["", "Unauthorized User - 401"];
      }
      if (response.status === 422 || response.status === 400) {
        return ["", "Unauthorized User - 422 or 400"];
      }
      return ["", response.status];
    }
  } catch (error) {
    console.log(error);
    return ["Server Side Error:", error];
  }
};

const fetchAllChallenges = async (jwt) => {
  try {
    if (!checkJwt(jwt) || jwt === undefined) {
      return ["", "jwt is undefined"];
    }
    // Make the API call
    const response = await fetch(BASE_API + "/challenges");
    if (response.ok) {
      const json = await response.json();
      return [json, null];
    } else {
      throw response;
    }
  } catch (e) {
    console.log("Error occurred..." + e);
  }
};

const fetchChallenge = async (jwt, id) => {
  try {
    if (!checkJwt(jwt) || jwt === undefined) {
      return ["", "jwt is undefined"];
    }

    console.log("Fetching challenge with id " + id);
    const response = await fetch(`${BASE_API}/challenges/${id}`); //`${API_URL}/${id}`);
    if (response.ok) {
      const json = await response.json();
      return [json, null];
    } else {
      throw response;
    }
  } catch (e) {
    console.log("Error occurred..." + e);
  }
};

export {
  fetchCreateChallenge,
  fetchDeleteChallenge,
  fetchAllChallenges,
  fetchChallenge,
};
