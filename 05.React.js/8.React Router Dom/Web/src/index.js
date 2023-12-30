import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./app.js";
// import Post from "./components/home/home";

import "./reportWebVitals.js";
import reportWebVitals from "./reportWebVitals.js";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

reportWebVitals();
