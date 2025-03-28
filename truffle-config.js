module.exports = {
  networks: {
    development: {
      host: "127.0.0.1", // Localhost for Ganache
      port: 7545, // Check your Ganache RPC Server Port
      network_id: "*", // Match any network
      gas: 8000000,
    },
  },
  compilers: {
    solc: {
      version: "0.8.21",
    },
  },
};
