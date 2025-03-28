import Web3 from "web3";
import contractABI from "../contracts/product.json"; // Make sure ABI is correct

const web3 = new Web3(window.ethereum || "http://localhost:7545"); // Connect to MetaMask or Ganache
const contractAddress = "YOUR_SMART_CONTRACT_ADDRESS"; // Replace with actual contract address

const productContract = new web3.eth.Contract(contractABI.abi, contractAddress);

export { web3, productContract };
