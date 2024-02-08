import React, { useRef, useState, useContext } from "react";
import axios from "axios";
import "./signin.css";
import { GlobalContext } from "../../context/context";
const baseUrl = "http://localhost:5000";

const Signin = () => {
  const { dispatch } = useContext(GlobalContext);
  const emailInputRef = useRef();
  const paswordInputRef = useRef();
  const [errorSuccessResponse, setErrorSuccessResponse] = useState(null);
  const [errorSuccessClass, setErorrSuccessClass] = useState("");
  // const [isloading, setLoading] = useState(null);

  const loginSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      let response = await axios.post(
        `${baseUrl}/api/v1/login`,
        {
          email: emailInputRef.current.value,
          password: paswordInputRef.current.value,
        },
        {
          withCredentials: true,
        }
      );
      setErrorSuccessResponse(response.data.message);
      setErorrSuccessClass("success");
      dispatch({
        type: "USER_LOGIN",
      });
      e.target.reset();
    } catch (error) {
      setErrorSuccessResponse(error.response.data.message);
      setErorrSuccessClass("error");
    }
  };

  return (
    <div className="signin-body">
      <h1 className="signin-heading">Sign In</h1>
      <div className="signin-form">
        <form id="signin-form" onSubmit={loginSubmitHandler}>
          <div className="l-field">
            <label htmlFor="l-email">Your email</label>
            <input
              type="email"
              id="l-email"
              placeholder="yourname@example.com"
              autoComplete="email"
              ref={emailInputRef}
            />
          </div>
          <div className="l-field">
            <label htmlFor="l-pass">Your password *</label>
            <input
              type="password"
              id="l-pass"
              ref={paswordInputRef}
              autoComplete="current-password"
              required
              minLength={6}
            />
          </div>
          <div className={`message ${errorSuccessClass}`}>
            {errorSuccessResponse}
          </div>
          <div className="submit-btn">
            <button type="submit" className="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;
