var SimpleStorage = artifacts.require("SimpleStorage");
var TutorialToken = artifacts.require("TutorialToken");
var ComplexStorage = artifacts.require("ComplexStorage");

var HeartBankToken = artifacts.require("HeartBankToken");
var BoxOfficeRegistry = artifacts.require("BoxOfficeRegistry");
var BoxOffice = artifacts.require("BoxOffice");

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(TutorialToken);
  deployer.deploy(ComplexStorage);

  deployer.deploy(HeartBankToken)
    .then(() => deployer.deploy(BoxOffice, HeartBankToken.address)
      .then(() => deployer.deploy(BoxOfficeRegistry, BoxOffice.address)));
};
