import { Link } from "react-router-dom";
import "./layout.css";

const Layout = ({ children }) => {
  return (
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
  );
};

export default Layout;
