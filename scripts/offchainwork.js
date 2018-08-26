const oracle = await currentOracle;
const usdPriceOfEth = await oracle.usdPriceOfEth();


this.setState({ account: accounts[0], balance: balance.toNumber().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") });
