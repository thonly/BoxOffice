const oracle = await currentOracle;
const usdPriceOfEth = await oracle.usdPriceOfEth();

const balance = await kiitos.balanceOf(accounts[0]);
this.setState({ account: accounts[0], balance: balance.toNumber().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") });
