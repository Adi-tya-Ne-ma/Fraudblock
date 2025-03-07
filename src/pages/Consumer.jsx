import React, { useState } from "react";

const Consumer = () => {
  const [formData, setFormData] = useState({
    consumerName: "",
    productId: "",
    verifyCode: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Consumer Data:", formData);
  };

  return (
    <div>
      <h2>Consumer Portal</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="consumerName" placeholder="Consumer Name" onChange={handleChange} required />
        <input type="text" name="productId" placeholder="Product ID" onChange={handleChange} required />
        <input type="text" name="verifyCode" placeholder="Verification Code" onChange={handleChange} required />
        <button type="submit">Verify</button>
      </form>
    </div>
  );
};

export default Consumer;
