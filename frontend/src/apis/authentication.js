import { BASE_URL } from "./constants";
import Cookies from "js-cookie";

const fetchLogin = async (bodyObject) => {
  try {
    // Make the API call
    const response = await fetch(BASE_URL + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyObject),
    });

    // Handle the response
    if (response.ok) {
      // Login successful
      console.log(
        "heard Authentication:" + response.headers.get("Authorization")
      );

      console.log("Login successful " + response);
      return [response, null];
    } else {
      // const result = await response.json();
      console.log(response);
      if (response.status === 401) {
        return ["", "Login or Password is invalid"];
      }

      // const errorMessage = response.statusText;
      // // Login failed
      // console.log("Login failed " + errorMessage);
      // throw new Error("Login failed " + errorMessage);
    }
  } catch (error) {
    console.log(error);
    return ["", error];
  }
};

const fetchRegister = async (bodyObject) => {
  try {
    // Make the API call
    const response = await fetch(BASE_URL + "/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyObject),
    });

    // Handle the response
    if (response.ok) {
      // Registration successful
      console.log("Registration with success");
      const result = await response.json();
      return [result, null];
    } else {
      const result = await response.json();
      console.log(result);

      const status = result.status;
      // const errorMessage = status.message;
      // const errorMessage = status.code;

      // Registration failed
      console.log("Registration failed " + status.message);
      throw new Error("Registration failed " + status.message);

      // status: { code: 422, message: "User couldn't be created successfully. #{resource.errors.full_messages.to_sentence}" }
      // }, status: resource.errors.details#:unprocessable_content
    }
  } catch (error) {
    return ["", error.message];
  }
};

const fetchLogout = async (jwt) => {
  try {
    // Make the API call
    if (jwt === undefined) {
      console.log("jwt is undefined");
      return ["", "jwt is undefined"];
    } else {
      console.log("jwt is defined");
    }
    const response = await fetch(BASE_URL + "/logout", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: jwt === undefined ? "" : jwt, //"Bearer " + localStorage.getItem("token"),
      },
      // body: JSON.stringify(bodyObject),
    });

    // Handle the response
    if (response.ok) {
      // Registration successful
      console.log("Logout with success");
      const result = await response.json();
      return [result, null];
    } else {
      const result = await response.json();
      console.log(result);

      const status = result.status;
      // Registration failed
      console.log("Logout failed " + status.message);
      // throw new Error("Logout failed " + status.message);
    }
  } catch (error) {
    return ["", error.message];
  }
};

export { fetchLogin, fetchRegister, fetchLogout };
