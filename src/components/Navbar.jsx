import React from "react";
import { Link } from "react-router-dom";
import "../index.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link className="navbar-brand" to="/">
          <span className="brand-highlight">Fake Product Identification</span>
        </Link>
        <div className="navbar-links">
          <Link to="/add-product" className="navbar-link">
            Add Product
          </Link>
          <Link to="/sell-to-seller" className="navbar-link">
            Sell to Seller
          </Link>
          <Link to="/sell-to-consumer" className="navbar-link">
            Sell to Consumer
          </Link>
          <Link to="/product-verification" className="navbar-link">
            Verify Product
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
