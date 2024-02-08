import { Link } from "react-router-dom";
import { useEffect, useContext } from "react";
import axios from "axios";
import "./layout.css";
import { GlobalContext } from "../../context/context";

const baseUrl = "http://localhost:5000";

const Layout = ({ children }) => {
  const { state, dispatch } = useContext(GlobalContext);

  useEffect(() => {
    const loginCheck = async () => {
      try {
        let response = await axios.get(`${baseUrl}/api/v1/ping`, {
          withCredentials: true,
        });
        dispatch({
          type: "USER_LOGIN",
        });
        console.log(response.data);
      } catch (error) {
        console.log(error.response.data);
        dispatch({
          type: "USER_LOGOUT",
        });
      }
    };
    loginCheck();
  }, [dispatch]);

  return (
    <div>
      {state.isLogin ? (
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
          </nav>
          <main className="main">{children}</main>
        </div>
      ) : (
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
      )}
    </div>
  );
};

export default Layout;
