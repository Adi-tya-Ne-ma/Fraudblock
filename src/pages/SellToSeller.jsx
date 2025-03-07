import React, { useState } from "react";

const SellToSeller = () => {
  const [formData, setFormData] = useState({
    sellerId: "",
    productSN: "",
    qrCodeFile: null,
  });
  const [verificationResult, setVerificationResult] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, qrCodeFile: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.qrCodeFile) {
      // Placeholder for QR verification logic
      setVerificationResult("Product is Original");
    } else {
      setVerificationResult("Tampered Product");
    }
  };

  return (
    <div>
      <h2>Sell Product to Seller</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="sellerId" placeholder="Seller ID" onChange={handleChange} required />
        <input type="text" name="productSN" placeholder="Product SN" onChange={handleChange} required />
        <input type="file" accept="image/*" onChange={handleFileChange} required />
        <button type="submit">Verify & Sell</button>
      </form>
      {verificationResult && <h3>{verificationResult}</h3>}
    </div>
  );
};

export default SellToSeller;