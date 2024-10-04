import { Link } from "react-router-dom";
import { useEffect, useContext } from "react";
import axios from "axios";
import "./layout.css";
import { GlobalContext } from "../../context/context";
import { API_URL } from "../../core";
import profile from "../../images/profile.jpg";
import { Search, HouseDoor, Gear, ChatLeft } from "react-bootstrap-icons";
import { RiGroupLine, RiShoppingBag2Line } from "@remixicon/react";
import "../../utility.css";

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
          payload: response.data.user,
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
          <nav className="navbar header">
            <div className="logo-with-form">
              <div className="app-logo">
                <Link className="logo rm-style" to="/">
                  Scrolllink
                </Link>
              </div>
              <div className="navbar-form">
                <div className="search-icon">
                  <Search className="search" />
                </div>
                <form action="" className="type-header-form">
                  <input type="text" placeholder="Search Something here..." />
                </form>
              </div>
            </div>
            <div className="user-profile">
              <p className="user-name">
                {state.user.firstName} {state.user.lastName}
              </p>
              <div className="user-pic">
                <img
                  className="user-profile-pic"
                  src={profile}
                  alt="younis malik"
                />
              </div>
            </div>
          </nav>
          <div className="body-section">
            <div className="sidebar">
              <ul className="nav-item rm-style">
                <li className="nav-list">
                  <HouseDoor />
                  <Link className="nav-link rm-style" to="/">
                    Feed
                  </Link>
                </li>
                <li className="nav-list">
                  <svg
                    className="check"
                    // enable-background="new 0 0 52 51"
                    height="24px"
                    id="Layer_1"
                    version="1.1"
                    viewBox="0 0 52 51"
                    width="24px"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g>
                      <rect fill="#888888" height="23" width="23" />
                      <rect fill="#888888" height="23" width="23" x="29" />
                      <rect fill="#888888" height="23" width="23" y="28" />
                      <rect
                        fill="#888888"
                        height="23"
                        width="23"
                        x="29"
                        y="28"
                      />
                    </g>
                  </svg>
                  <Link className="nav-link rm-style" to="/explore">
                    Explore
                  </Link>
                </li>
                <li className="nav-list">
                  <RiShoppingBag2Line />
                  <Link className="nav-link rm-style" to="/marketplace">
                    Marketplace
                  </Link>
                </li>
                <li className="nav-list">
                  <RiGroupLine />
                  <Link className="nav-link rm-style" to="/groups">
                    Groups
                  </Link>
                </li>
                <li className="nav-list">
                  <svg
                    fill="none"
                    height="24"
                    viewBox="0 0 118 155"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g>
                      <path
                        d="M56.0783 107.382C55.4041 108.47 54.645 109.505 53.8083 110.474C41.3062 122.797 28.7751 135.09 16.2149 147.353C14.0892 149.468 11.7634 151.374 9.27033 153.043C5.04205 155.798 1.705 154.135 1.00105 149.114C0.880203 147.788 0.852448 146.455 0.917897 145.124C0.964697 113.828 0.930928 82.5317 1.11293 51.2362C1.18378 38.9257 1.66869 26.6152 2.12109 14.3105C2.32537 11.6584 2.7779 9.03129 3.47299 6.46332C4.21009 3.25696 5.09796 2.39559 8.47798 2.1245C15.3478 1.57324 22.2313 0.939644 29.1155 0.846904C54.251 0.510311 79.3897 0.402671 104.527 0.150391C107.856 0.184034 111.148 0.847844 114.229 2.10645C114.975 2.3557 115.635 2.81229 116.13 3.42268C116.625 4.03307 116.935 4.77187 117.024 5.55211C117.262 7.08419 117.366 8.63381 117.335 10.1839C115.675 53.3361 114.86 96.4946 116.072 139.676C116.054 143.084 115.767 146.486 115.213 149.848C114.88 152.368 112.483 153.852 109.719 153.48C106.933 153.093 104.387 151.697 102.565 149.56C88.7036 134.096 71.7678 122.033 56.0783 107.382ZM108.629 7.75387L10.4976 8.46337C10.3676 9.60868 10.2481 10.2502 10.2331 10.8935C10.083 17.6564 9.79098 24.4206 9.83713 31.1822C10.0789 66.5829 10.3705 101.983 10.712 137.382C10.7185 138.076 10.8115 138.769 10.8999 139.936C12.092 138.828 12.9111 138.112 13.6788 137.347C25.9464 125.103 38.2079 112.855 50.4634 100.602C54.9348 96.123 57.7733 96.0063 62.4611 100.122C68.3898 105.326 74.414 110.423 80.3179 115.656C88.7133 123.096 97.0353 130.619 105.398 138.096C105.947 138.504 106.521 138.878 107.115 139.218C104.65 95.2053 107.356 51.7531 108.629 7.75387Z"
                        fill="#888888"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0">
                        <rect
                          fill="white"
                          height="155"
                          transform="translate(0.777344)"
                          width="117"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  <Link className="nav-link rm-style" to="/myfavourites">
                    My favourites
                  </Link>
                </li>
                {/* <li className="nav-list">
                <Link
                  className="nav-link rm-style"
                  to={`/profile/${state.userId}`}
                >
                  Profile
                </Link>
              </li>
              <li className="nav-list">
                <Link className="nav-link rm-style" to="/about">
                  About
                </Link>
              </li>
              <li className="nav-list">
                <Link className="nav-link rm-style" to="/contact">
                  Contact
                </Link>
              </li> */}
                <li className="nav-list">
                  <ChatLeft />
                  <Link className="nav-link rm-style" to="/chat">
                    Messages
                  </Link>
                </li>
                <li className="nav-list">
                  <Gear />
                  <Link className="nav-link rm-style" to="/setting">
                    Settings
                  </Link>
                </li>
              </ul>
              {/* <div className="logout-btn">
                <button onClick={logoutHandler}>Logout</button>
              </div> */}
            </div>
            <main className="main">{children}</main>
          </div>
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
