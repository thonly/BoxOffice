pragma solidity ^0.4.24;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
// import "../contracts/ThrowProxy.sol";
import "../contracts/BoxOfficeRegistry.sol";

contract TestBoxOfficeRegistry {

    function testAdmin() {
        BoxOfficeRegistry registry = BoxOfficeRegistry(DeployedAddresses.BoxOfficeRegistry());
        Assert.equal(registry.admin(), msg.sender, "should return address of admin");
    }

    function testUpgradeBoxOffice() {
        BoxOfficeRegistry registry = new BoxOfficeRegistry();
        Assert.isTrue(registry.upgradeBoxOffice(address(1)), "should update registry");
        Assert.equal(registry.currentBoxOffice(), address(1), "should store new address");
        Assert.equal(registry.previousBoxOffices(0), address(0), "should store old address");
        Assert.isFalse(registry.upgradeBoxOffice(address(1)), "should not store duplicate address");
    }

    function testUpgradeBoxOfficeForFailure() {
        BoxOfficeRegistry registry = new BoxOfficeRegistry();
        // ThrowProxy throwProxy = new ThrowProxy(address(registry));
        // BoxOfficeRegistry(address(throwProxy)).upgradeBoxOffice(address(1));
        // Assert.isFalse(throwProxy.execute(), "should throw because not admin");
        bool result = address(registry).call("upgradeBoxOffice", address(1));
        Assert.isFalse(result, "should throw because not admin");
    }

}
