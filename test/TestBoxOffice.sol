pragma solidity ^0.4.24;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/HeartBankToken.sol";
import "../contracts/BoxOffice.sol";

contract TestBoxOffice {

    function testInitialState() {
        BoxOffice boxOffice = BoxOffice(DeployedAddresses.BoxOffice());
        Assert.equal(boxOffice.HEARTBANK(), address(0), "should store HeartBank address");
        Assert.equal(boxOffice.KIITOS(), DeployedAddresses.HeartBankToken(), "should store Kiitos address");
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
        BoxOffice boxOffice = new BoxOffice(address(kiitos));

        uint salesEndTime = now + 28 days;
        uint price = 1 finney;
        uint ticketSupply = 1 ether;
        string memory movieName = "Casablanca";
        string memory ticketSymbol = "CSBC";
        string memory logline = "Set in unoccupied Africa during the early days of World War II: An American expatriate meets a former lover, with unforeseen complications.";
        string memory poster = "https://en.wikipedia.org/wiki/Casablanca_(film)#/media/File:CasablancaPoster-Gold.jpg";
        string memory trailer = "https://www.imdb.com/title/tt0034583";
        
        Assert.isTrue(boxOffice.makeFilm(salesEndTime, price, ticketSupply, movieName, ticketSymbol, logline, poster, trailer), "");
        
    }

}
