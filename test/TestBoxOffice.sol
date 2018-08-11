pragma solidity ^0.4.24;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/HeartBankToken.sol";
import "../contracts/BoxOffice.sol";

contract TestBoxOffice {

    function testInitialState() {
        BoxOffice boxOffice = BoxOffice(DeployedAddresses.BoxOffice());
        Assert.equal(boxOffice.HEARTBANK(), address(0), "should store HeartBank address");
        Assert.equal(boxOffice.KIITOS(), address(0), "should store Kiitos address");
        Assert.equal(boxOffice.admin(), msg.sender, "should store admin");
        Assert.equal(boxOffice.listingFee(), 2, "should store listing fee");
        Assert.equal(boxOffice.withdrawFee(), 1, "should store withdraw fee");
        Assert.equal(boxOffice.usdPriceOfEth(), 354, "should store price of ether");
    }

    function testFallBack() {
        BoxOffice boxOffice = BoxOffice(DeployedAddresses.BoxOffice());
        uint balance = address(this).balance;
        boxOffice.call.value(1 finney)("callback");
        Assert.equal(address(this).balance, balance, "should return finney");
    }

    function testMakeFilm() {
        HeartBankToken kiitos = new HeartBankToken();
        BoxOffice boxOffice = BoxOffice(DeployedAddresses.BoxOffice());
    }

}
