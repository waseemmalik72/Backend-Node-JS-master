import React, { useRef, useState } from "react";
import axios from "axios";
import "./signup.css";
const baseUrl = "http://localhost:5000";

const Signup = () => {
  const firstNameInputRef = useRef();
  const lastNameInputRef = useRef();
  const emailInputRef = useRef();
  const paswordInputRef = useRef();
  const confirmPasswordInputRef = useRef();
  const [errorSuccessResponse, setErrorSuccessResponse] = useState(null);
  // const [alert, setAlert] = useState(false);
  const [errorSuccessClass, setErorrSuccessClass] = useState("");

  // useEffect(() => {

  // }, [alert]);

  const signupSubmitHandler = async (e) => {
    e.preventDefault();

    const password = paswordInputRef.current.value;
    const confirmPassword = confirmPasswordInputRef.current.value;
    // console.log(password !== confirmPassword);

    if (password !== confirmPassword) {
      setErrorSuccessResponse("Password does not  match");
      setErorrSuccessClass("error");
      return;
    }

    try {
      let response = await axios.post(`${baseUrl}/api/v1/signup`, {
        firstName: firstNameInputRef.current.value,
        lastName: lastNameInputRef.current.value,
        email: emailInputRef.current.value,
        password: password,
      });
      setErrorSuccessResponse(response.data.message);
      setErorrSuccessClass("success");
      // console.log(response.data);
      // setAlert(!alert);
      e.target.reset();
    } catch (error) {
      setErrorSuccessResponse(error.response.data.message);
      setErorrSuccessClass("error");
      // console.log(error.response.data.message);
    }
  };

  return (
    <div className="signup-body">
      <h1 className="signup-heading">Sign up</h1>
      <div className="signup-form">
        <form id="signup-form" onSubmit={signupSubmitHandler}>
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
