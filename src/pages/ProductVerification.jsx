import React, { useState } from "react";
import { useWeb3 } from "../context/Web3Context";
import jsQR from 'jsqr';

const ProductVerification = () => {
  const { web3, contract, loading, error: web3Error } = useWeb3();
  const [formData, setFormData] = useState({
    productSN: "",
    qrFile: null
  });
  const [verificationResult, setVerificationResult] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    if (e.target.name === "qrFile") {
      setFormData({ ...formData, qrFile: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const readQRFile = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          // Convert the file to an image
          const img = new Image();
          img.src = e.target.result;
          await new Promise(resolve => img.onload = resolve);

          // Create a canvas to draw the image
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          canvas.width = img.width;
          canvas.height = img.height;
          context.drawImage(img, 0, 0);

          // Here you would need to add a QR code reading library
          const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
          const code = jsQR(imageData.data, canvas.width, canvas.height);

          if (code) {
            const qrData = JSON.parse(code.data);
            resolve(qrData);
          } else {
            reject(new Error("No QR code found in image"));
          }
        } catch (err) {
          reject(new Error("Failed to read QR code"));
        }
      };
      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setVerificationResult(null);

    try {
      if (!contract) {
        throw new Error("Web3 not initialized");
      }

      if (!formData.qrFile) {
        throw new Error("Please upload a QR code image");
      }

      // Read QR code from uploaded file
      const qrData = await readQRFile(formData.qrFile);

      // Verify if the entered product SN matches the QR code
      if (qrData.productId !== web3.utils.keccak256(formData.productSN)) {
        setVerificationResult({
          isAuthentic: false,
          message: "Tampered Product",
        });
        return;
      }

      // Fetch product details from the blockchain
      const productDetails = await contract.methods.products(formData.productSN).call();

      setVerificationResult({
        isAuthentic: true,
        details: productDetails,
        message: "Verified Product",
      });

    } catch (err) {
      console.error("Error:", err);
      setError(err.message || "Could not verify product");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (web3Error) return <div>Error: {web3Error}</div>;

  return (
    <div className="container mt-4">
      <h2>Product Verification</h2>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
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
            onChange={(e) => setFormData({ ...formData, productSN: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="qrFile">Upload QR Code</label>
          <input
            id="qrFile"
            type="file"
            onChange={(e) => setFormData({ ...formData, qrFile: e.target.files[0] })}
          />
        </div>
        <button type="submit">Verify Product</button>
      </form>

      {verificationResult && (
        <div className={`alert ${verificationResult.isAuthentic ? 'alert-success' : 'alert-danger'} mt-4`}>
          <h4 className="alert-heading">
            {verificationResult.message}
          </h4>
          {verificationResult.isAuthentic && verificationResult.details && (
            <div className="mt-3">
              <h5>Product Details:</h5>
              <ul className="list-unstyled">
                <li><strong>Product Name:</strong> {verificationResult.details.productName}</li>
                <li><strong>Serial Number:</strong> {verificationResult.details.productSN}</li>
                <li><strong>Manufacturer ID:</strong> {verificationResult.details.manufacturerId}</li>
                <li><strong>Price:</strong> {web3.utils.fromWei(verificationResult.details.productPrice, 'ether')} ETH</li>
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductVerification;
