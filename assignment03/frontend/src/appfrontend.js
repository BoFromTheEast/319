// Author: Ponciano Ramirez, Bo Oo
// ISU Netid : pram1347@iastate.edu, bhoo@iastate.edu
// Date : April 27th, 2024
import React, { useState } from "react";
import ReadProducts from "./ReadProducts";
import DeleteProducts from "./deleteProduct.js";
import UpdateProducts from "./updateProducts.js";
import AddProduct from "./addProduct.js";
import AboutUs from "./aboutUs.js";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";

function App() {
  const [currentView, setCurrentView] = useState("read");

  let componentToRender;
  switch (currentView) {
    case "read":
      componentToRender = <ReadProducts />;
      break;
    case "delete":
      componentToRender = <DeleteProducts />;
      break;
    case "update":
      componentToRender = <UpdateProducts />;
      break;
    case "add":
      componentToRender = <AddProduct />;
      break;
    case "about":
      componentToRender = <AboutUs />;
      break;
    default:
      componentToRender = <ReadProducts />;
  }

  return (
    <div>
      {/* Bootstrap Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            My Product App
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Button
                  variant="primary"
                  className="nav-link btn"
                  onClick={() => setCurrentView("read")}
                >
                  Read Products
                </Button>
              </li>
              <li className="nav-item">
                <Button
                  variant="primary"
                  className="nav-link btn"
                  onClick={() => setCurrentView("add")}
                >
                  Add Product
                </Button>
              </li>
              <li className="nav-item">
                <Button
                  variant="primary"
                  className="nav-link btn"
                  onClick={() => setCurrentView("delete")}
                >
                  Delete Product
                </Button>
              </li>
              <li className="nav-item">
                <Button
                  variant="primary"
                  className="nav-link btn"
                  onClick={() => setCurrentView("update")}
                >
                  Update Product
                </Button>
              </li>
              <li className="nav-item">
                <Button
                  variant="primary"
                  className="nav-link btn"
                  onClick={() => setCurrentView("about")}
                >
                  About Us
                </Button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {componentToRender}
    </div>
  );
}

export default App;
