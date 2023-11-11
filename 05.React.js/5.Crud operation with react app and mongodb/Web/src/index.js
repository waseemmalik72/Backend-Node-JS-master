import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import PostCard from "./components/home.jsx";

// ReactDOM.render(<PostCard />, document.querySelector("#root"));

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <PostCard />
  </StrictMode>
);
