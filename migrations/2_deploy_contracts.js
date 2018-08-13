var SimpleStorage = artifacts.require("SimpleStorage");
var TutorialToken = artifacts.require("TutorialToken");
var ComplexStorage = artifacts.require("ComplexStorage");

var HeartBankToken = artifacts.require("HeartBankToken");
var BoxOfficeOracleStorage = artifacts.require("BoxOfficeOracleStorage");
var BoxOfficeOracleLibrary = artifacts.require("BoxOfficeOracleLibrary");
var BoxOfficeOracle = artifacts.require("BoxOfficeOracle");
var BoxOffice = artifacts.require("BoxOffice");
var BoxOfficeRegistry = artifacts.require("BoxOfficeRegistry");

module.exports = function(deployer, network, accounts) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(TutorialToken);
  deployer.deploy(ComplexStorage);
  deployer.deploy(BoxOfficeOracleLibrary);
  
  deployer.deploy(BoxOfficeOracleStorage);    
  deployer.link(BoxOfficeOracleLibrary, BoxOfficeOracle);

  deployer.deploy(HeartBankToken)
    .then(() => deployer.deploy(BoxOfficeOracle, BoxOfficeOracleStorage.address))
    .then(() => deployer.deploy(BoxOffice, HeartBankToken.address, BoxOfficeOracle.address))
    .then(() => deployer.deploy(BoxOfficeRegistry, BoxOfficeOracle.address))
    .then(() => BoxOfficeOracleStorage.deployed().then(instance => instance.addAdmin(BoxOfficeOracle.address)));
};
