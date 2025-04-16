import React, { useState } from "react";
import { useWeb3 } from "../context/Web3Context";

const SellToSeller = () => {
  const { web3, contract, account, loading, error: web3Error } = useWeb3();
  const [formData, setFormData] = useState({
    productSN: "",
    sellerId: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      if (!contract || !account) {
        throw new Error("Web3 not initialized");
      }

      // Simple contract call without any validation
      const result = await contract.methods
        .sellProductToSeller(
          formData.productSN,
          formData.sellerId
        )
        .send({ from: account });

      console.log("Transaction successful:", result);
      setSuccess("Product successfully transferred to seller!");
      
      // Clear form
      setFormData({
        productSN: "",
        sellerId: ""
      });

    } catch (err) {
      console.error("Error:", err);
      setError("Transaction failed. Please try again.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (web3Error) return <div>Error: {web3Error}</div>;

  return (
    <div className="container mt-4">
      <h2>Sell Product to Seller</h2>
      
      <div className="mb-4">
        <small className="text-muted">Connected Account:</small>
        <p className="font-monospace">{account}</p>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {success && (
        <div className="alert alert-success" role="alert">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Product Serial Number</label>
          <input
            type="text"
            className="form-control"
            name="productSN"
            placeholder="Enter product serial number"
            value={formData.productSN}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Seller ID</label>
          <input
            type="text"
            className="form-control"
            name="sellerId"
            placeholder="Enter seller ID"
            value={formData.sellerId}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-success">
          Transfer Product
        </button>
      </form>
    </div>
  );
};

export default SellToSeller;