import React, { useState } from "react";

const SellToConsumer = () => {
  const [formData, setFormData] = useState({
    consumerId: "",
    productSN: "",
    sellerId: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Sell Product to Consumer:", formData);
  };

  return (
    <div>
      <h2>Sell Product to Consumer</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="consumerId" placeholder="Consumer ID" onChange={handleChange} required />
        <input type="text" name="productSN" placeholder="Product SN" onChange={handleChange} required />
        <input type="text" name="sellerId" placeholder="Seller ID" onChange={handleChange} required />
        <button type="submit">Sell Product</button>
      </form>
    </div>
  );
};

export default SellToConsumer;
