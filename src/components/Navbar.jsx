import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../index.css";
import "../App.css";

const Navbar = () => {
  console.log("Navbar component rendered!"); // Debugging line

  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{
        backgroundColor: "red", // Debugging style
        color: "white",
        height: "80px",
        border: "2px solid yellow",
      }}
    >
      <div className="container">
        <Link className="navbar-brand text-white" to="/">
          Fake Product Identification
        </Link>

        {/* Navbar Buttons */}
        <div>
          <Link to="/add-product" className="btn btn-warning m-2">
            Add Product
          </Link>
          <Link to="/sell-to-seller" className="btn btn-success m-2">
            Sell Product to Seller
          </Link>
          <Link to="/add-seller" className="btn btn-primary m-2">
            Register Seller
          </Link>
          <Link to="/sell-to-consumer" className="btn btn-primary m-2">
            Sell Product to Consumer
          </Link>
          <Link to="/product-verification" className="btn btn-primary m-2">
            Consumer Product Verification
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
