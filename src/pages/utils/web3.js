import Web3 from "web3";
import ProductRegistry from "../../../build/contracts/ProductRegistry.json"; // Update path to match your project structure

let web3;
let productContract;
let account;

const initWeb3 = async () => {
  try {
    // Check if MetaMask is installed
    if (window.ethereum) {
      web3 = new Web3(window.ethereum);
      
      // Request account access
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      account = accounts[0];

      // Verify network connection
      const networkId = await web3.eth.net.getId().catch(() => {
        throw new Error("Cannot connect to network. Please check if Ganache is running.");
      });

      console.log("Connected to network:", networkId);

    } else {
      // Fallback to Ganache
      const provider = new Web3.providers.HttpProvider("http://127.0.0.1:7545");
      web3 = new Web3(provider);
      
      // Test the connection
      await web3.eth.net.isListening();
    }
    return web3;
  } catch (error) {
    console.error("Error initializing Web3:", error);
    throw new Error("Failed to connect to the network. Please check if Ganache is running and MetaMask is properly configured.");
  }
};

const initContract = async () => {
  try {
    if (!web3) {
      throw new Error("Web3 not initialized");
    }

    const networkId = await web3.eth.net.getId();
    const deployedNetwork = ProductRegistry.networks[networkId];
    
    if (!deployedNetwork) {
      throw new Error('Contract not deployed to the current network. Please check your network settings.');
    }

    productContract = new web3.eth.Contract(
      ProductRegistry.abi,
      deployedNetwork.address
    );
    
    return productContract;
  } catch (error) {
    console.error("Error initializing contract:", error);
    throw error;
  }
};

// Helper function to get current account
const getCurrentAccount = () => account;

export { initWeb3, initContract, web3, productContract, getCurrentAccount };
