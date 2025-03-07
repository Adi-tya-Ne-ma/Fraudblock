import React, { useState } from "react";

const Manufacturer = () => {
  const [formData, setFormData] = useState({
    manufacturerId: "",
    productId: "",
    productName: "",
    productPrice: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Manufacturer Data:", formData);
  };

  return (
    <div>
      <h2>Manufacturer Portal</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="manufacturerId" placeholder="Manufacturer ID" onChange={handleChange} required />
        <input type="text" name="productId" placeholder="Product ID" onChange={handleChange} required />
        <input type="text" name="productName" placeholder="Product Name" onChange={handleChange} required />
        <input type="number" name="productPrice" placeholder="Product Price" onChange={handleChange} required />
        <button type="submit">Add the Product</button>
      </form>
    </div>
  );
};

export default Manufacturer;