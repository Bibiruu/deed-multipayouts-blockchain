const HDWalletProvider = require('@truffle/hdwallet-provider');
require('dotenv').config();

// Exponential backoff formula: 2^attempt * 1000 (milliseconds)
const exponentialBackoff = (attempt) => {
  return Math.pow(2, attempt) * 1000;
};

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*",
    },

    sepolia: {
      provider: () => new HDWalletProvider(
        process.env.MNEMONIC,
        `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHMY_ENDPOINT}`
      ),
      network_id: 11155111,
      gas: 461700,               // Gas limit
      gasPrice: 20000000000,       // 20 Gwei
      confirmations: 1,
      timeoutBlocks: 200,
      skipDryRun: true,
      networkCheckTimeout: 10000,  // Increase if necessary
      clientConfig: {
        maxAttempts: 5,
        interval: exponentialBackoff,
      }
    }
  },
  compilers: {
    solc: {
      version: "0.8.19",
    }
  },
};
