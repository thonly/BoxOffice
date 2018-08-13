var SimpleStorage = artifacts.require("SimpleStorage");
var TutorialToken = artifacts.require("TutorialToken");
var ComplexStorage = artifacts.require("ComplexStorage");

var HeartBankToken = artifacts.require("HeartBankToken");
var BoxOfficeOracleStorage = artifacts.require("BoxOfficeOracleStorage");
var BoxOfficeOracleLibrary = artifacts.require("BoxOfficeOracleLibrary");
var BoxOfficeOracle = artifacts.require("BoxOfficeOracle");
var BoxOffice = artifacts.require("BoxOffice");
var BoxOfficeRegistry = artifacts.require("BoxOfficeRegistry");

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(TutorialToken);
  deployer.deploy(ComplexStorage);

  deployer.deploy(HeartBankToken)
    .then(() => {
      deployer.deploy(BoxOfficeOracleLibrary);
      deployer.link(BoxOfficeOracleLibrary, BoxOfficeOracle);
    })
    .then(() => deployer.deploy(BoxOfficeOracleStorage, BoxOfficeOracleLibrary.address)
    .then(() => deployer.deploy(BoxOfficeOracle, BoxOfficeOracleStorage.address)
    .then(() => deployer.deploy(BoxOffice, HeartBankToken.address, BoxOfficeOracle.address)
    .then(() => deployer.deploy(BoxOfficeRegistry, BoxOfficeOracle.address)
  ))));
};
