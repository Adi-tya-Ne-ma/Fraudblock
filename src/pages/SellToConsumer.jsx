import React, { useState } from "react";
import { useWeb3 } from "../context/Web3Context";

const SellToConsumer = () => {
  const { web3, contract, account, loading, error: web3Error } = useWeb3();
  const [formData, setFormData] = useState({
    productSN: "",
    consumerId: "",
    consumerAddress: "",
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
      if (!formData.productSN || !formData.consumerId || !formData.productPrice) {
        setError("All fields are required");
        return;
      }

      // Ensure the product price is converted to Wei
      const priceInWei = web3.utils.toWei(formData.productPrice, "ether");

      await contract.methods
        .sellProductToConsumer(formData.productSN, formData.consumerId, formData.consumerAddress)
        .send({
          from: account, // Seller's account
          value: priceInWei, // ETH to be sent
        });

      setSuccess("Product sold to consumer successfully!");
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

      {/* <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">Instructions</h5>
          <ul>
            <li>
              Enter the Product Serial Number of the product you want to sell
            </li>
            <li>Enter a Consumer ID for tracking purposes</li>
            <li>Make sure you are the current owner of the product</li>
          </ul>
        </div>
      </div> */}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="productSN">Product Serial Number</label>
          <input
            id="productSN"
            type="text"
            placeholder="Enter Product Serial Number"
            value={formData.productSN}
            onChange={(e) => setFormData({ ...formData, productSN: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="consumerId">Consumer ID</label>
          <input
            id="consumerId"
            type="text"
            placeholder="Enter Consumer ID"
            value={formData.consumerId}
            onChange={(e) => setFormData({ ...formData, consumerId: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="consumerAddress">Consumer Address</label>
          <input
            id="consumerAddress"
            type="text"
            placeholder="Enter Consumer Ethereum Address"
            value={formData.consumerAddress}
            onChange={(e) => setFormData({ ...formData, consumerAddress: e.target.value })}
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
        <button type="submit">Sell to Consumer</button>
      </form>

      <div className="mt-4">
        <small className="text-muted">
          Note: After selling to a consumer, the product ownership will be
          transferred and the transaction will be recorded on the blockchain.
        </small>
      </div>
    </div>
  );
};

export default SellToConsumer;
