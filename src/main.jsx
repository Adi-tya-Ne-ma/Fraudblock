import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Web3Provider } from "./context/Web3Context";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";  

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>  
    <Web3Provider>
      <App />
    </Web3Provider>
  </BrowserRouter>
);
