pragma solidity ^0.4.24;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/BoxOfficeOracleStorage.sol";
import "../contracts/BoxOfficeOracle.sol";

contract TestBoxOfficeOracle {

    BoxOfficeOracle oracle;

    function beforeEach() public {
        //oracle = new BoxOfficeOracle(DeployedAddresses.BoxOfficeOracleStorage());
        oracle = BoxOfficeOracle(DeployedAddresses.BoxOfficeOracle());
    }

    function testOwner() public {
        Assert.equal(oracle.owner(), msg.sender, "should return address of admin");
    }

    function testUsdPriceOfEth() public {
        Assert.equal(oracle.usdPriceOfEth(), 354, "should return price of ether in USD");
    }

    function testConvertToUsd() public {
        Assert.equal(oracle.convertToUsd(1 ether), 354, "should convert wei to USD");
    }

    function testUpdatePrice() public {
        Assert.isTrue(oracle.updatePrice(), "should emit event for oracle to catch");
    }

    function testSetPrice() public {
        Assert.isTrue(oracle.setPrice(300), "should set new price of ether in USD");
        Assert.equal(oracle.usdPriceOfEth(), 300, "should return new price of ether in USD");
    }

    function testKill() public {
        Assert.isFalse(address(oracle).call("kill"), "should self-destruct and throw");
    }

}
