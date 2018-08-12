pragma solidity ^0.4.24;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/HeartBankToken.sol";
import "../contracts/BoxOffice.sol";

contract TestBoxOffice0 {

    uint public initialBalance = 1 ether;

    function testInitialState() public {
        BoxOffice boxOffice = BoxOffice(DeployedAddresses.BoxOffice());
        Assert.equal(boxOffice.HEARTBANK(), address(0), "should store HeartBank address");
        Assert.equal(boxOffice.KIITOS(), DeployedAddresses.HeartBankToken(), "should store Kiitos address");
        Assert.equal(boxOffice.admin(), msg.sender, "should store admin");
        Assert.equal(boxOffice.listingFee(), 2, "should store listing fee");
        Assert.equal(boxOffice.withdrawFee(), 1, "should store withdraw fee");
        Assert.equal(boxOffice.usdPriceOfEth(), 354, "should store price of ether");
    }

    function testFallBack() public {
        BoxOffice boxOffice = BoxOffice(DeployedAddresses.BoxOffice());
        Assert.equal(address(this).balance, initialBalance, "should receive ether");
        Assert.isTrue(address(boxOffice).call.value(1 finney)(0x0), "should trigger callback");
        // Assert.equal(address(this).balance, initialBalance, "should return finney");
    }

}

contract TestBoxOffice {

    BoxOffice boxOffice;
    uint public initialBalance = 1 ether;

    function beforeEach() public {
        HeartBankToken kiitos = new HeartBankToken();
        boxOffice = new BoxOffice(address(kiitos));
        Assert.isTrue(kiitos.addAdmin(address(boxOffice)), "should add admin");
        Assert.isTrue(boxOffice.makeFilm(now + 28 days, 1 finney, 1 ether, "TBA", "TBA", "TBA", "TBA", "TBA"), "should make film");
    }

    function testUpdateFilm() public {
        Assert.isTrue(boxOffice.updateFilm(0, now + 30 days, 2 finney, "TBA2", "TBA2", "TBA2", "TBA2", "TBA2"), "should update film");
    }

    function testBuyTickets() public {
        Assert.isTrue(boxOffice.buyTickets.value(3 finney)(0, 2), "should purchase tickets");
    }
}

contract TestBoxOffice1 {

    function testMakeFilm1() public {
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
        
        Assert.isTrue(kiitos.addAdmin(address(boxOffice)), "should add admin");
        Assert.isTrue(boxOffice.makeFilm(salesEndTime, price, ticketSupply, movieName, ticketSymbol, logline, poster, trailer), "should make film");
        
        address movie;
        address filmmaker;

        (movie, filmmaker, , , , , , , , ) = boxOffice.getFilmSummary(0);

        Assert.isNotZero(movie, "should create movie");
        Assert.equal(filmmaker, address(this), "should store filmmaker");
    }

}

contract TestBoxOffice2 {

    function testMakeFilm2() public {
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
        
        Assert.isTrue(kiitos.addAdmin(address(boxOffice)), "should add admin");
        Assert.isTrue(boxOffice.makeFilm(salesEndTime, price, ticketSupply, movieName, ticketSymbol, logline, poster, trailer), "should make film");
        
        uint salesEndTime_;
        uint price_;

        ( , , salesEndTime_, price_, , , , , , ) = boxOffice.getFilmSummary(0);

        Assert.equal(salesEndTime, salesEndTime_, "should store sales ending time");
        Assert.equal(price, price_, "should store price");
    }

}

contract TestBoxOffice3 {

    function testMakeFilm3() public {
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
        
        Assert.isTrue(kiitos.addAdmin(address(boxOffice)), "should add admin");
        Assert.isTrue(boxOffice.makeFilm(salesEndTime, price, ticketSupply, movieName, ticketSymbol, logline, poster, trailer), "should make film");
        
        uint ticketSupply_;
        string memory movieName_;
        
        ( , , , , ticketSupply_, movieName_, , , , ) = boxOffice.getFilmSummary(0);

        Assert.equal(ticketSupply, ticketSupply_, "should store ticket supply");
        Assert.equal(movieName, movieName_, "should store movie name");
    }

}

contract TestBoxOffice4 {

    function testMakeFilm4() public {
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
        
        Assert.isTrue(kiitos.addAdmin(address(boxOffice)), "should add admin");
        Assert.isTrue(boxOffice.makeFilm(salesEndTime, price, ticketSupply, movieName, ticketSymbol, logline, poster, trailer), "should make film");
        
        string memory ticketSymbol_;
        string memory logline_;
        
        ( , , , , , , ticketSymbol_, logline_, , ) = boxOffice.getFilmSummary(0);

        Assert.equal(ticketSymbol, ticketSymbol_, "should store ticket symbol");
        Assert.equal(logline, logline_, "should store logline");
    }

}

contract TestBoxOffice5 {

    function testMakeFilm5() public {
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
        
        Assert.isTrue(kiitos.addAdmin(address(boxOffice)), "should add admin");
        Assert.isTrue(boxOffice.makeFilm(salesEndTime, price, ticketSupply, movieName, ticketSymbol, logline, poster, trailer), "should make film");
        
        string memory poster_;
        string memory trailer_;
        
        ( , , , , , , , , poster_, trailer_) = boxOffice.getFilmSummary(0);

        Assert.equal(poster, poster_, "should store poster");
        Assert.equal(trailer, trailer_, "should store trailer");
    }

}