import React, { useState } from "react";
import { useWeb3 } from "../context/Web3Context";

const SellToSeller = () => {
  const { web3, contract, account, loading, error: web3Error } = useWeb3();
  const [formData, setFormData] = useState({
    productSN: "",
    sellerId: "",
    sellerAddress: "", // Add this
    productPrice: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!formData.productSN || !formData.sellerId || !formData.sellerAddress || !formData.productPrice) {
        setError("All fields are required");
        return;
      }

      await contract.methods
        .sellProductToSeller(formData.productSN, formData.sellerId, formData.sellerAddress)
        .send({
          from: account, // Manufacturer's account
          value: web3.utils.toWei(formData.productPrice, "ether"), // Convert ETH to Wei
        });

      setSuccess("Product sold to seller successfully!");
      setError(""); // Clear any previous errors
    } catch (err) {
      setError("Transaction failed: " + err.message);
      setSuccess(""); // Clear any previous success messages
    }
  };

  if (loading) return <div>Loading...</div>;
  if (web3Error) return <div>Error: {web3Error}</div>;

  return (
    <div className="container mt-4">
      <h2>Sell Product to Seller</h2>

      <div className="mb-4">
        <small className="text-muted">Connected Account (Manufacturer):</small>
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
        <div className="form-group">
          <label htmlFor="productSN">Product Serial Number</label>
          <input
            id="productSN"
            type="text"
            placeholder="Enter Product Serial Number"
            value={formData.productSN}
            onChange={(e) =>
              setFormData({ ...formData, productSN: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label htmlFor="sellerId">Seller ID</label>
          <input
            id="sellerId"
            type="text"
            placeholder="Enter Seller ID"
            value={formData.sellerId}
            onChange={(e) =>
              setFormData({ ...formData, sellerId: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label htmlFor="sellerAddress">Seller Address</label>
          <input
            id="sellerAddress"
            type="text"
            placeholder="Enter Seller Ethereum Address"
            value={formData.sellerAddress}
            onChange={(e) =>
              setFormData({ ...formData, sellerAddress: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label htmlFor="productPrice">Product Price (ETH)</label>
          <input
            id="productPrice"
            type="text"
            placeholder="Enter Product Price"
            value={formData.productPrice}
            onChange={(e) =>
              setFormData({ ...formData, productPrice: e.target.value })
            }
          />
        </div>
        <button type="submit">Sell to Seller</button>
      </form>
    </div>
  );
};

export default SellToSeller;
