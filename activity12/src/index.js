import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import MyApplication from "./MyApplication.js";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <MyApplication />
  </React.StrictMode>
);
