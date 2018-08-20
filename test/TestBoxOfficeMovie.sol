pragma solidity ^0.4.24;

import "truffle/Assert.sol";
import "../contracts/BoxOfficeMovie.sol";

contract TestBoxOfficeMovie {

    BoxOfficeMovie movie;

    function beforeEach() public {
        movie = new BoxOfficeMovie(address(1), 1 ether, "Titanic", "TTN");
    }

    function testMovieDetails() public {
        Assert.equal(movie.name(), "Titanic", "should store movie name");
        Assert.equal(movie.symbol(), "TTN", "should store ticket symbol");
        Assert.equal(movie.totalSupply(), 1 ether, "should store ticket supply");
        Assert.equal(movie.balanceOf(address(1)), 1 ether, "should store balance");
        Assert.equal(movie.allowance(address(1), address(this)), 1 ether, "should approve allowance");
    }

    function testUpdateMovie() public {
        Assert.isTrue(movie.updateMovieName("Avatar"), "should update movie name");
        Assert.isTrue(movie.updateTicketSymbol("AVT"), "should update ticket symbol");
        Assert.equal(movie.name(), "Avatar", "should store new movie name");
        Assert.equal(movie.symbol(), "AVT", "should store new ticket symbol");
    }

    function testUpdateFilm() public {
        Assert.isTrue(boxOffice.updateFilm(0, now + 30 days, 2 finney, "title2", "symbol2", "logline2", "ipfshash2", "ipfshash2"), "should update film");
    }

    function testSpendTicket() public {
        Assert.isTrue(boxOffice.buyTickets.value(3 finney)(0, 2), "should purchase tickets");
        Assert.isTrue(boxOffice.spendTicket(0), "should spend ticket");
    }

    function testTransferToBoxOffice() public {
        Assert.isTrue(movie.transferToBoxOffice(address(1), 1 finney), "should transfer to box office");
        Assert.equal(movie.balanceOf(address(1)), 1 ether - 1 finney, "should update sender's balance");
        Assert.equal(movie.balanceOf(address(this)), 1 finney, "should update recipient's balance");
    }

    function testGetAudienceMembers() public {
        Assert.isTrue(boxOffice.buyTickets.value(3 finney)(0, 2), "should purchase tickets");
        Assert.isTrue(boxOffice.spendTicket(0), "should spend ticket");
        address[] memory members = boxOffice.getAudienceMembers(0);
        Assert.equal(members[0], address(this), "should store audience member");
    }

    function testIsAudienceMember() public {
        Assert.isTrue(boxOffice.buyTickets.value(3 finney)(0, 2), "should purchase tickets");
        Assert.isTrue(boxOffice.spendTicket(0), "should spend ticket");
        Assert.isTrue(boxOffice.isAudienceMember(0, address(this)), "should store audience member");
    }

}
