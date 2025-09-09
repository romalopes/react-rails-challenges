import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { validateEmail, validatePassword } from "../utilities/validations";
import { Link } from "react-router";
import { fetchLogin, fetchRegister } from "../apis/authentication";
import { useNavigate } from "react-router";
import Cookies from "js-cookie";

const initialErrorState = {
  name: "",
  email: "",
  password: "",
  api: "",
};

function Authentication({ pageType }) {
  useEffect(() => {
    const jwt = Cookies.get("jwt");
    if (jwt != undefined) {
      navigate("/");
    }
  }, []);

  const navigate = useNavigate();
  // const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(initialErrorState);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Clear previous error messages
    setErrors(initialErrorState);
    let newErrors = {};
    // Handle form submission here
    console.log("name:", name, "email:", email, "password:", password);
    if (!validateEmail(email)) {
      newErrors = { ...newErrors, email: "Invalid email" };
      // alert("Invalid email");
    }
    if (!validatePassword(password)) {
      // alert("Invalid password");
      newErrors = {
        ...newErrors,
        password: "Password must be at least 6 characters",
      };
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    // Make the API call
    console.log("pageType:", pageType);
    if (pageType === PageType.login) {
      const data = {
        user: {
          email: email,
          password: password,
        },
      };
      const [loginResponse, error] = await fetchLogin(data);
      console.log("loginResponse:" + loginResponse);
      console.log("Error:" + error);
      if (error) {
        newErrors = { ...newErrors, api: error.toString() };
        setErrors(newErrors);
      } else {
        const jwt = loginResponse.headers.get("Authorization");
        console.log("heard Authentication:" + jwt);
        const result = await loginResponse.json();
        const status = result.status;
        console.log(status);
        const message = status.message;
        console.log(message);
        const code = status.code;
        console.log(code);
        const token = status.token;
        console.log(token);
        const data = status.data;
        console.log(data.user.email);
        Cookies.set("jwt", jwt);
        const cookieValue = Cookies.get("jwt");
        console.log("jwt cookie:" + cookieValue);
        // setCookie("token", token);
        // setCookie("jwt", jwt);
        // console.log("cookies:" + cookies.jwt);
        //
        if (cookieValue !== undefined) {
          navigate("/");
        } else {
          navigate("/login");
        }

        //  status: {
        // code: 200, message: 'Logged in successfully.',
        // token: @token,
        // data: {
        //   user: UserSerializer.new(resource).serializable_hash[:data][:attributes]
        // }
      }
    } else {
      const data = {
        user: {
          name: name,
          email: email,
          password: password,
        },
      };
      const [registerResponse, error] = await fetchRegister(data);
      console.log(registerResponse);
      console.log(error);
      if (error) {
        setErrors({ ...errors, api: error.toString() });
        // newErrors = { ...newErrors, api: error.toString() };
        // setErrors(newErrors);
      } else {
        const status = registerResponse.status;
        const message = status.message;
        const code = status.code;
        const token = status.token;
        const data = status.data;
        console.log(status);
        console.log(message);
        console.log(code);
        console.log(token);
        console.log(data);

        navigate("/");
      }
    }
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  return (
    <div>
      <h1>This is Authentication page</h1>

      <div className="bg-whte">
        <div className="mt-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <h3 className="text-xl font-bold">
            {pageType === PageType.login ? "Login" : "Register"}
          </h3>
          {pageType === PageType.login ? (
            <p className="mt-4">
              Not a user?
              <Link className="underline mt-1" to="/register">
                Register
              </Link>
            </p>
          ) : (
            <p className="mt-4">
              Already a user?
              <Link className="underline mt-1" to="/login">
                Login
              </Link>
            </p>
          )}
          <form onSubmit={handleSubmit}>
            {pageType === PageType.register && (
              <div className="flex mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                <input
                  name="name"
                  type="text"
                  autoComplete="username"
                  placeholder="Username"
                  value={name}
                  onChange={handleNameChange}
                />
              </div>
            )}
            <div className="flex mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              <input
                name="email"
                type="email"
                placeholder="Email"
                autoComplete="email"
                value={email}
                onChange={handleEmailChange}
              />
              {errors.email && (
                <p className="text-sm text-medium text-red-500 mt-1">
                  {errors.email}
                </p>
              )}
            </div>
            <div className="flex mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              <input
                placeholder="Password"
                type="password"
                name="password"
                autoComplete="current-password"
                value={password}
                onChange={handlePasswordChange}
              />
              {errors.password && (
                <p className="text-sm text-medium text-red-500 mt-1">
                  {errors.password}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="bg-indigo-500 mt-10 hover:bg-indigo-600 px-3 py-2 rounded text-white"
            >
              {pageType === PageType.login ? "Login" : "Register"}
            </button>
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
}

export const PageType = Object.freeze({
  login: 0,
  register: 1,
});

Authentication.propTypes = {
  pageType: PropTypes.number.isRequired,
};

export default Authentication;
