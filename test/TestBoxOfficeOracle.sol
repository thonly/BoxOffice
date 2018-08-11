pragma solidity ^0.4.24;

import "truffle/Assert.sol";
import "../contracts/BoxOfficeOracle.sol";

contract TestBoxOfficeOracle {

    BoxOfficeOracle oracle;

    function beforeEach() {
       oracle = new BoxOfficeOracle();
    }

    function testAdmin() {
        Assert.equal(oracle.admin(), address(this), "should return address of admin");
    }

    function testUsdPriceOfEth() {
        Assert.equal(oracle.usdPriceOfEth(), 354, "should return price of ether in USD");
    }

    function testConvertToUsd() {
        Assert.equal(oracle.convertToUsd(1 ether), 354, "should convert Wei to USD");
    }

    function testUpdatePrice() {
        Assert.isTrue(oracle.updatePrice(), "should emit event for oracle to catch");
    }

    function testSetPrice() {
        Assert.isTrue(oracle.setPrice(300), "should set new price of ether in USD");
        Assert.equal(oracle.usdPriceOfEth(), 300, "should return new price of ether in USD");
    }

}
