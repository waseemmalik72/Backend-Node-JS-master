import { Link } from "react-router-dom";
import { useEffect, useContext } from "react";
import axios from "axios";
import "./layout.css";
import { GlobalContext } from "../../context/context";
import { API_URL } from "../../core";

const Layout = ({ children }) => {
  const { state, dispatch } = useContext(GlobalContext);
  useEffect(() => {
    const loginCheck = async () => {
      try {
        let response = await axios.get(`${API_URL}/api/v1/profile`, {
          withCredentials: true,
        });
        dispatch({
          type: "USER_LOGIN",
          payload: response.data.data,
        });
      } catch (error) {
        dispatch({
          type: "USER_LOGOUT",
        });
      }
    };
    loginCheck();
  }, [dispatch]);

  const logoutHandler = async () => {
    try {
      let response = await axios.post(
        `${API_URL}/api/v1/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      console.log(response.data);
      dispatch({
        type: "USER_LOGOUT",
      });
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <div>
      {/* It's Admin Routes */}
      {state?.isLogin === true && state?.role === "admin" ? (
        <div className="container">
          <nav className="navbar">
            <ul className="nav-item">
              <li className="nav-list">
                <Link className="nav-link" to="/">
                  Admin Home
                </Link>
              </li>
              <li className="nav-list">
                <Link className="nav-link" to="/about">
                  Admin About
                </Link>
              </li>
              <li className="nav-list">
                <Link className="nav-link " to="/contact">
                  Admin Contact
                </Link>
              </li>
              <li className="nav-list">
                <Link className="nav-link" to="/chat">
                  Admin Chat
                </Link>
              </li>
            </ul>
            <div className="logout-btn">
              <button onClick={logoutHandler}>Logout</button>
            </div>
          </nav>
          <main className="main">{children}</main>
        </div>
      ) : null}

      {/* It's User Routes */}

      {state?.isLogin === true && state?.role === "user" ? (
        <div className="container">
          <nav className="navbar">
            <ul className="nav-item">
              <li className="nav-list">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-list">
                <Link className="nav-link" to="/about">
                  About
                </Link>
              </li>
              <li className="nav-list">
                <Link className="nav-link " to="/contact">
                  Contact
                </Link>
              </li>
              <li className="nav-list">
                <Link className="nav-link" to="/chat">
                  Chat
                </Link>
              </li>
            </ul>
            <div className="logout-btn">
              <button onClick={logoutHandler}>Logout</button>
            </div>
          </nav>
          <main className="main">{children}</main>
        </div>
      ) : null}

      {/* It's unAuth Routes */}

      {state?.isLogin === false ? (
        <div className="container">
          <nav className="navbar">
            <ul className="nav-item">
              <li className="nav-list">
                <Link className="nav-link" to="/signup">
                  Signup
                </Link>
              </li>
              <li className="nav-list">
                <Link className="nav-link" to="/signin">
                  Signin
                </Link>
              </li>
            </ul>
          </nav>
          <main className="main">{children}</main>
        </div>
      ) : null}

      {/* It's Splash Screen */}

      {state?.isLogin === null ? (
        <div className="spinner-div">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            style={{
              margin: "auto",
              display: "block",
              shapeRendering: "auto",
            }}
            width="616px"
            height="616px"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid"
          >
            <path
              fill="none"
              stroke="#1d0e0b"
              strokeWidth="4"
              strokeDasharray="42.76482137044271 42.76482137044271"
              d="M24.3 30C11.4 30 5 43.3 5 50s6.4 20 19.3 20c19.3 0 32.1-40 51.4-40 C88.6 30 95 43.3 95 50s-6.4 20-19.3 20C56.4 70 43.6 30 24.3 30z"
              strokeLinecap="round"
              style={{
                transform: "scale(0.4)",
                transformOrigin: "50px 50px",
              }}
            >
              <animate
                attributeName="stroke-dashoffset"
                repeatCount="indefinite"
                dur="1.3s"
                keyTimes="0;1"
                values="0;256.58892822265625"
              ></animate>
            </path>
          </svg>
          <h1 className="loading">Loading...</h1>
        </div>
      ) : null}
    </div>
  );
};

export default Layout;
