import React, { useRef, useState } from "react";
import axios from "axios";
import "./signup.css";
import { API_URL } from "../../core";

const Signup = () => {
  const firstNameInputRef = useRef();
  const lastNameInputRef = useRef();
  const emailInputRef = useRef();
  const paswordInputRef = useRef();
  const confirmPasswordInputRef = useRef();
  const [errorSuccessResponse, setErrorSuccessResponse] = useState(null);
  const [isDisable, setDisable] = useState(false);
  // const [alert, setAlert] = useState(false);
  const [errorSuccessClass, setErorrSuccessClass] = useState("");

  const signupSubmitHandler = async (e) => {
    e.preventDefault();
    setDisable(true);
    const password = paswordInputRef.current.value;
    const confirmPassword = confirmPasswordInputRef.current.value;
    // console.log(password !== confirmPassword);

    if (password !== confirmPassword) {
      setErrorSuccessResponse("Password does not  match");
      setErorrSuccessClass("error");
      setTimeout(() => {
        setErrorSuccessResponse(null);
        setErorrSuccessClass("");
      }, 5000);
      return;
    }

    try {
      let response = await axios.post(`${API_URL}/api/v1/signup`, {
        firstName: firstNameInputRef.current.value,
        lastName: lastNameInputRef.current.value,
        email: emailInputRef.current.value,
        password: password,
      });
      setErrorSuccessResponse(response.data.message);
      setErorrSuccessClass("success");
      setDisable(false);
      setTimeout(() => {
        setErrorSuccessResponse(null);
        setErorrSuccessClass("");
      }, 5000);
      // console.log(response.data);
      // setAlert(!alert);
      e.target.reset();
    } catch (error) {
      setErrorSuccessResponse(error.response.data.message);
      setErorrSuccessClass("error");
      setDisable(false);
      setTimeout(() => {
        setErrorSuccessResponse(null);
        setErorrSuccessClass("");
      }, 5000);
      // console.log(error.response.data.message);
    }
  };

  return (
    <div className="signup-body">
      <h1 className="signup-heading">Sign up</h1>
      <p>{isDisable ? "loading" : "click me"}</p>
      <div className="signup-form">
        <form
          id="signup-form"
          onSubmit={signupSubmitHandler}
          disabled={isDisable}
        >
          <div className="s-field">
            <label htmlFor="s-fname">Your Firstname</label>
            <input
              type="text"
              id="s-fname"
              placeholder="your First Name"
              autoComplete="given-name"
              ref={firstNameInputRef}
              required
            />
          </div>
          <div className="s-field">
            <label htmlFor="s-lname">Your Lastname</label>
            <input
              type="text"
              id="s-lname"
              placeholder="your Last Name"
              autoComplete="family-name"
              ref={lastNameInputRef}
              required
            />
          </div>
          <div className="s-field">
            <label htmlFor="s-email">Your email</label>
            <input
              type="email"
              id="s-email"
              placeholder="yourname@example.com"
              ref={emailInputRef}
              required
            />
          </div>
          <div className="s-field">
            <label htmlFor="s-pass">Your password *</label>
            <input
              type="password"
              id="s-pass"
              ref={paswordInputRef}
              autoComplete="new-password"
              required
              minLength={6}
            />
          </div>
          <div className="s-field">
            <label htmlFor="s-cpass">Confirm password *</label>
            <input
              type="password"
              id="s-cpass"
              ref={confirmPasswordInputRef}
              autoComplete="new-password"
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

export default Signup;
