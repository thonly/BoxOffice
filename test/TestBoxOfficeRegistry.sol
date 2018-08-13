pragma solidity ^0.4.24;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/BoxOfficeRegistry.sol";
// import "../contracts/ThrowProxy.sol";

contract TestBoxOfficeRegistry {

    function testOwner() public {
        BoxOfficeRegistry registry = BoxOfficeRegistry(DeployedAddresses.BoxOfficeRegistry());
        Assert.equal(registry.owner(), msg.sender, "should return address of admin");
    }

    function testUpgradeBoxOffice() public {
        BoxOfficeRegistry registry = new BoxOfficeRegistry(address(0));
        Assert.isTrue(registry.upgradeBoxOffice(address(1)), "should update registry");
        Assert.equal(registry.currentBoxOffice(), address(1), "should store new address");
        Assert.equal(registry.previousBoxOffices(0), address(0), "should store old address");
        Assert.isFalse(registry.upgradeBoxOffice(address(1)), "should not store duplicate address");
    }

    function testUpgradeBoxOfficeForFailure() public {
        BoxOfficeRegistry registry = new BoxOfficeRegistry(address(0));
        // ThrowProxy throwProxy = new ThrowProxy(address(registry));
        // BoxOfficeRegistry(address(throwProxy)).upgradeBoxOffice(address(1));
        // Assert.isFalse(throwProxy.execute(), "should throw because not admin");
        Assert.isFalse(address(registry).call("upgradeBoxOffice", address(1)), "should throw because not admin");
    }

}
