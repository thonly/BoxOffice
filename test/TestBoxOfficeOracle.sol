pragma solidity ^0.4.24;

import "truffle/Assert.sol";
import "../contracts/BoxOfficeOracle.sol";

contract TestBoxOfficeOracle {

    BoxOfficeOracle oracle;

    function beforeEach() public {
       oracle = new BoxOfficeOracle();
    }

    function testOwner() public {
        Assert.equal(oracle.owner(), address(this), "should return address of admin");
    }

    function testUsdPriceOfEth() public {
        Assert.equal(oracle.usdPriceOfEth(), 354, "should return price of ether in USD");
    }

    function testConvertToUsd() public {
        Assert.equal(oracle.convertToUsd(1 ether), 354, "should convert Wei to USD");
    }

    function testUpdatePrice() public {
        Assert.isTrue(oracle.updatePrice(), "should emit event for oracle to catch");
    }

    function testSetPrice() public {
        Assert.isTrue(oracle.setPrice(300), "should set new price of ether in USD");
        Assert.equal(oracle.usdPriceOfEth(), 300, "should return new price of ether in USD");
    }

}
