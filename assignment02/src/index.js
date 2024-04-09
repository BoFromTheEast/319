import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Browse from "./browse.js";
import Cart from "./cart.js";
import reportWebVitals from "./reportWebVitals";

const App = () => {
  return (
    <React.StrictMode>
      <div className="flex">
        <Browse />
        {/* <Cart /> */}
      </div>
    </React.StrictMode>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

reportWebVitals();
