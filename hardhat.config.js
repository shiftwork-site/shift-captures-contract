require("@nomiclabs/hardhat-web3");
require("@nomiclabs/hardhat-truffle5");
require("hardhat-contract-sizer");
require("hardhat-gas-reporter");
require("solidity-coverage");
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");

const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  networks:
  {
    goerli: {
      url: "https://eth-goerli.public.blastapi.io",
      accounts: [process.env.TESTNET_PRIVATE_KEY],
    },
    mainnet: {
      url: process.env.ALCHEMY_HTTP,
      accounts: [process.env.MAINNET_PRIVATE_KEY],
      gas: 3500000

    },
    sepolia: {
      url: process.env.ALCHEMY_SEPOLIA_HTTP,
      accounts: [process.env.TESTNET_PRIVATE_KEY],
      allowUnlimitedContractSize: true,
      gas: 50000000000, //units of gas you are willing to pay, aka gas limit
      gasPrice: 50000000000, //gas is typically in units of gwei, but you must enter it as wei here

    },
    holesky: {
      url: "https://rpc.holesky.ethpandaops.io",
      accounts: [process.env.TESTNET_PRIVATE_KEY],
      allowUnlimitedContractSize: true,
      gas: 5000000, //units of gas you are willing to pay, aka gas limit
      gasPrice: 50000000000, //gas is typically in units of gwei, but you must enter it as wei here
    },
  },

  etherscan: {
    apiKey: {
      mainnet: process.env.ETHERSCAN_API_KEY,
      sepolia: process.env.ETHERSCAN_API_KEY

    }
  },
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
