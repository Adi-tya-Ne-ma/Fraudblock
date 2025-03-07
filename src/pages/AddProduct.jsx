// AddProduct.jsx
import React, { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    manufacturerId: "",
    productSN: "",
    productPrice: "",
    productName: "",
  });
  const [qrCode, setQrCode] = useState("");
  const qrRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const qrData = JSON.stringify(formData);
    setQrCode(qrData);
  };

  const downloadQR = () => {
    if (qrRef.current) {
      const canvas = qrRef.current.querySelector("canvas");
      const url = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = url;
      link.download = "product_qr.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div>
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="manufacturerId" placeholder="Manufacturer ID" onChange={handleChange} required />
        <input type="text" name="productSN" placeholder="Product SN" onChange={handleChange} required />
        <input type="text" name="productPrice" placeholder="Product Price" onChange={handleChange} required />
        <input type="text" name="productName" placeholder="Product Name" onChange={handleChange} required />
        <button type="submit">Generate QR</button>
      </form>
      {qrCode && (
        <div ref={qrRef}>
          <h3>Generated QR Code:</h3>
          <QRCodeCanvas value={qrCode} size={200} />
          <br />
          <button onClick={downloadQR}>Download QR</button>
        </div>
      )}
    </div>
  );
};

export default AddProduct;
