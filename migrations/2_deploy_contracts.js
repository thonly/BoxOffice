const HeartBankToken = artifacts.require("HeartBankToken");
const BoxOfficeOracleStorage = artifacts.require("BoxOfficeOracleStorage");
const BoxOfficeOracleLibrary = artifacts.require("BoxOfficeOracleLibrary");
const BoxOfficeOracle = artifacts.require("BoxOfficeOracle");
const BoxOffice = artifacts.require("BoxOffice");
const BoxOfficeRegistry = artifacts.require("BoxOfficeRegistry");

module.exports = (deployer, network, accounts) => {
  deployer.deploy(BoxOfficeOracleLibrary);
  deployer.deploy(BoxOfficeOracleStorage);    
  deployer.link(BoxOfficeOracleLibrary, BoxOfficeOracle);

  deployer.deploy(HeartBankToken)
    .then(() => deployer.deploy(BoxOfficeOracle, BoxOfficeOracleStorage.address))
    .then(() => deployer.deploy(BoxOffice, HeartBankToken.address, BoxOfficeOracle.address))
    .then(() => deployer.deploy(BoxOfficeRegistry, BoxOfficeOracle.address))
    .then(() => HeartBankToken.deployed().then(instance => instance.addAdmin(BoxOffice.address)))
    .then(() => BoxOfficeOracleStorage.deployed().then(instance => instance.addAdmin(BoxOfficeOracle.address)));
};