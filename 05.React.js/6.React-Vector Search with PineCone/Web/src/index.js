import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import Post from "./components/home.jsx";
import "./reportWebVitals.js";
import reportWebVitals from "./reportWebVitals.js";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <Post />
  </StrictMode>
);

reportWebVitals();
