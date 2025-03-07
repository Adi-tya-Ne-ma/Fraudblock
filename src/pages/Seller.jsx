import React, { useState } from "react";

const Seller = () => {
  const [formData, setFormData] = useState({
    sellerName: "",
    sellerId: "",
    product: "",
    quantity: "",
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
      <h2>Seller Portal</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="sellerName" placeholder="Seller Name" onChange={handleChange} required />
        <input type="text" name="sellerId" placeholder="Seller ID" onChange={handleChange} required />
        <input type="text" name="product" placeholder="Product" onChange={handleChange} required />
        <input type="number" name="quantity" placeholder="Quantity" onChange={handleChange} required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Seller;