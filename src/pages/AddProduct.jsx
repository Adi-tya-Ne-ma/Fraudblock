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
  const [success, setSuccess] = useState("");
  const qrRef = useRef(null);

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

      const priceInWei = web3.utils.toWei(formData.productPrice, "ether");

      await contract.methods
        .addProduct(
          formData.manufacturerId,
          formData.productSN,
          formData.productName,
          priceInWei
        )
        .send({ from: account });

      const qrData = JSON.stringify({
        productId: web3.utils.keccak256(formData.productSN),
        manufacturerId: formData.manufacturerId,
        sellerId: "",
        consumerId: "",
        productName: formData.productName,
        productSN: formData.productSN,
        productPrice: formData.productPrice,
        blockchainAddress: account,
      });
      setQrCode(qrData);

      setSuccess("Product added and QR generated successfully!");

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

  if (loading) return <div>Loading...</div>;
  if (web3Error) return <div>Error: {web3Error}</div>;

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Add Product</h2>

      <div className="mb-2">
        <small className="text-muted">Connected Account (Manufacturer):</small>
        <p className="font-monospace mb-2">{account}</p>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <div className="row">
        <div className="col-md-5">
          <div className="card p-4 shadow-sm">
            <form onSubmit={handleSubmit}>
              <div className="mb-2">
                <label htmlFor="manufacturerId" className="form-label">Manufacturer ID</label>
                <input
                  id="manufacturerId"
                  name="manufacturerId"
                  type="text"
                  className="form-control"
                  placeholder="Enter Manufacturer ID"
                  value={formData.manufacturerId}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-2">
                <label htmlFor="productSN" className="form-label">Product Serial Number</label>
                <input
                  id="productSN"
                  name="productSN"
                  type="text"
                  className="form-control"
                  placeholder="Enter Product Serial Number"
                  value={formData.productSN}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-2">
                <label htmlFor="productName" className="form-label">Product Name</label>
                <input
                  id="productName"
                  name="productName"
                  type="text"
                  className="form-control"
                  placeholder="Enter Product Name"
                  value={formData.productName}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="productPrice" className="form-label">Product Price (ETH)</label>
                <input
                  id="productPrice"
                  name="productPrice"
                  type="text"
                  className="form-control"
                  placeholder="Enter Product Price"
                  value={formData.productPrice}
                  onChange={handleChange}
                />
              </div>
              <button type="submit" className="btn btn-warning w-100 fw-bold">Add Product</button>
            </form>
          </div>
        </div>
      </div>

      {qrCode && (
        <div ref={qrRef} className="mt-5 text-center">
          <h3>Generated QR Code:</h3>
          <QRCodeCanvas value={qrCode} size={200} />
          <br />
          <button className="btn btn-success mt-3" onClick={downloadQR}>
            Download QR
          </button>
        </div>
      )}
    </div>
  );
};

export default AddProduct;