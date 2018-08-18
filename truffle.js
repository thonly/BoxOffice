const HDWalletProvider = require("truffle-hdwallet-provider");
const { MNEMONIC, INFURA } = require("./config/dev");

module.exports = {
  migrations_directory: "./migrations",
  networks: {
    development: {
      host: "localhost",
      port: 9545,
      network_id: "*"
    },
    rinkeby: {
      provider: () => new HDWalletProvider(MNEMONIC, INFURA),
      network_id: 4
      // gas: 30000000
    }
  },
  solc: {
    optimizer: {
      enabled: true,
      runs: 500
    }
  },
  mocha: {
    useColors: true
  } 
};
