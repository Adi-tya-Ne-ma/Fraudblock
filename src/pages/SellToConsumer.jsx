import React, { useState } from "react";
import { useWeb3 } from "../context/Web3Context";

const SellToConsumer = () => {
  const { web3, contract, account, loading, error: web3Error } = useWeb3();
  const [formData, setFormData] = useState({
    productSN: "",
    consumerId: ""
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

      // Call contract method to sell to consumer
      const result = await contract.methods
        .sellProductToConsumer(
          formData.productSN,
          formData.consumerId
        )
        .send({ from: account });

      console.log("Transaction successful:", result);
      setSuccess("Product successfully sold to consumer!");
      
      // Clear form
      setFormData({
        productSN: "",
        consumerId: ""
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
      <h2>Sell Product to Consumer</h2>
      
      <div className="mb-4">
        <small className="text-muted">Connected Account (Seller):</small>
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

      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">Instructions</h5>
          <ul>
            <li>Enter the Product Serial Number of the product you want to sell</li>
            <li>Enter a Consumer ID for tracking purposes</li>
            <li>Make sure you are the current owner of the product</li>
          </ul>
        </div>
      </div>

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
          <label className="form-label">Consumer ID</label>
          <input
            type="text"
            className="form-control"
            name="consumerId"
            placeholder="Enter consumer ID"
            value={formData.consumerId}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Sell to Consumer
        </button>
      </form>

      <div className="mt-4">
        <small className="text-muted">
          Note: After selling to a consumer, the product ownership will be transferred 
          and the transaction will be recorded on the blockchain.
        </small>
      </div>
    </div>
  );
};

export default SellToConsumer;
