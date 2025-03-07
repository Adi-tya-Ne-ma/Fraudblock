// AddSeller.jsx
import React, { useState } from "react";

const AddSeller = () => {
  const [formData, setFormData] = useState({
    sellerId: "",
    sellerSN: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Seller Data:", formData);
  };

  return (
    <div>
      <h2>Add Seller</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="sellerId" placeholder="Seller ID" onChange={handleChange} required />
        <input type="text" name="sellerSN" placeholder="Seller SN" onChange={handleChange} required />
        <button type="submit">Add Seller</button>
      </form>
    </div>
  );
};

export default AddSeller;