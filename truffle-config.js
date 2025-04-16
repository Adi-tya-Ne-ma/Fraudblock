module.exports = {
  networks: {
    development: {
      host: "127.0.0.1", // Localhost for Ganache
      port: 7545, // Check your Ganache RPC Server Port
      network_id: "*", // Match any network
      gas: 6721975, // Match the block gas limit
      gasPrice: 20000000000, // 20 gwei
      confirmations: 0,
      timeoutBlocks: 200,
      skipDryRun: true
    },
  },
  compilers: {
    solc: {
      version: "0.8.21",
      settings: {
        optimizer: {
          enabled: true,
          runs: 200
        },
        evmVersion: "london"
      }
    },
  },
};
