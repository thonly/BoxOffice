const BoxOffice = artifacts.require("BoxOffice.sol");

contract('BoxOffice', accounts => {

  const owner = accounts[0];

  it("should store initial states", async() => {
    const boxOffice = await BoxOffice.deployed();
    const HEARTBANK = await boxOffice.HEARTBANK.call();
    const admin = await boxOffice.admin.call();
    const listingFee = await boxOffice.listingFee.call();
    const withdrawFee = await boxOffice.withdrawFee.call();

    assert.equal(HEARTBANK, 0x0);
    assert.equal(admin, accounts[0]);
    assert.equal(listingFee, 2);
    assert.equal(withdrawFee, 1);
  });

  it("should create a film and movie tickets", async() => {
    const salesEndTime = Date.now() + 28*60*60*24;
    const price = web3.toWei(1, "finney");
    const ticketSupply = web3.toWei(1, "ether");
    const movieName = "Casablanca";
    const ticketSymbol = "CSBC";
    const logline = "Set in unoccupied Africa during the early days of World War II: An American expatriate meets a former lover, with unforeseen complications.";
    const poster = "ipfs hash";
    const trailer = "ipfs hash";

    const boxOffice = await BoxOffice.deployed();
    const event = boxOffice.FilmCreated();

    let filmIndex;

    await event.watch((err, res) => {
      assert.equal(res.args.filmIndex, 0);
      
    });
    await boxOffice.makeFilm(salesEndTime, price, ticketSupply, movieName, ticketSymbol, logline, poster, trailer, {from: owner});
  });

});
