// AddProduct.jsx
import React, { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { useWeb3 } from "../context/Web3Context";

const AddProduct = () => {
  const { web3, contract, account, loading, error: web3Error } = useWeb3();
  const [formData, setFormData] = useState({
    manufacturerId: "",
    productSN: "",
    productPrice: "",
    productName: "",
  });
  const [qrCode, setQrCode] = useState("");
  const [error, setError] = useState("");
  const qrRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (!contract || !account) {
        throw new Error("Web3 not initialized");
      }

      // Convert price to Wei
      const priceInWei = web3.utils.toWei(formData.productPrice, "ether");

      // Call smart contract method
      await contract.methods
        .addProduct(
          formData.manufacturerId,
          formData.productSN,
          formData.productName,
          priceInWei
        )
        .send({ from: account });

      // Generate QR code data
      const qrData = JSON.stringify({
        ...formData,
        timestamp: Date.now(),
        blockchainAddress: account
      });
      setQrCode(qrData);

      // Clear form
      setFormData({
        manufacturerId: "",
        productSN: "",
        productPrice: "",
        productName: "",
      });

    } catch (err) {
      setError(err.message);
    }
  };

  const downloadQR = () => {
    if (qrRef.current) {
      const canvas = qrRef.current.querySelector("canvas");
      const url = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = url;
      link.download = `product_${formData.productSN}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="alert alert-info">
          Connecting to blockchain...
        </div>
      </div>
    );
  }

  if (web3Error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger">
          Error: {web3Error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2>Add Product</h2>
      
      {/* Connected Account Display */}
      <div className="mb-4">
        <small className="text-muted">Connected Account:</small>
        <p className="font-monospace">{account}</p>
      </div>

      {/* Error Display */}
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {/* Product Form */}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            name="manufacturerId"
            placeholder="Manufacturer ID"
            value={formData.manufacturerId}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            name="productSN"
            placeholder="Product SN"
            value={formData.productSN}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="number"
            step="0.000001"
            className="form-control"
            name="productPrice"
            placeholder="Product Price (ETH)"
            value={formData.productPrice}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            name="productName"
            placeholder="Product Name"
            value={formData.productName}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-success">
          Add Product & Generate QR
        </button>
      </form>

      {/* QR Code Display */}
      {qrCode && (
        <div ref={qrRef} className="mt-4 text-center">
          <h3>Generated QR Code:</h3>
          <QRCodeCanvas value={qrCode} size={200} />
          <br />
          <button 
            onClick={downloadQR} 
            className="btn btn-primary mt-3"
          >
            Download QR
          </button>
        </div>
      )}
    </div>
  );
};

export default AddProduct;