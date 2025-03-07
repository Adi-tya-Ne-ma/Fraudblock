import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AddProduct from "./pages/AddProduct";
import SellToSeller from "./pages/SellToSeller";
import AddSeller from "./pages/AddSeller";
import SellToConsumer from "./pages/SellToConsumer";
import ProductVerification from "./pages/ProductVerification";

function App() {
  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/sell-to-seller" element={<SellToSeller />} />
          <Route path="/add-seller" element={<AddSeller />} />
          <Route path="/sell-to-consumer" element={<SellToConsumer />} />
          <Route path="/product-verification" element={<ProductVerification />} />
        </Routes>
      </div>
    </>
  );
}

export default App;