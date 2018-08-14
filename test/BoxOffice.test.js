const BoxOffice = artifacts.require("BoxOffice.sol");

contract('BoxOffice', accounts => {

  it("should store initial states", async () => {
    const instance = await BoxOffice.deployed();
    const HEARTBANK = await instance.HEARTBANK.call();
    const admin = await instance.admin.call();
    const listingFee = await instance.listingFee.call();
    const withdrawFee = await instance.withdrawFee.call();

    assert.equal(HEARTBANK, 0x0);
    assert.equal(admin, accounts[0]);
    assert.equal(listingFee, 2);
    assert.equal(withdrawFee, 1);
  });

});
