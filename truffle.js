const HDWalletProvider = require("truffle-hdwallet-provider");

module.exports = {
  migrations_directory: "./migrations",
  networks: {
    development: {
      host: "localhost",
      port: 9545,
      network_id: "*"
    },
    rinkeby: {
      provider: () => new HDWalletProvider("pepper stable ripple enrich provide business ankle tank net lumber acquire earn", "https://rinkeby.infura.io/DPHGLx2mBJeWsuDv1jFV"),
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
