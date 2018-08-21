import React, { Component } from "react";
import currentOracle, { Kiitos, BoxOffice } from "../../scripts/contracts";
import Layout from "../../components/Layout";

class BoxOfficeMovie extends Component {
    static async getInitialProps() {
        const kiitos = await Kiitos.deployed();
        const supply = await kiitos.totalSupply();
        const boxOffice = await BoxOffice.deployed();
        const listingFee = await boxOffice.listingFee();
        const oracle = await currentOracle;
        const usdPriceOfEth = await oracle.usdPriceOfEth();

        return {supply: supply.toNumber(), listingFee: listingFee.toNumber(), usdPriceOfEth: usdPriceOfEth.toNumber()};
    }

    spendTicketButton() {}

    watchMovieButton() {}

    updateFilmPage() {}

    buyTicketsModal() {}

    withdrawFundModal() {}

    renderMovieSummary() {}

    renderWithdrawals() {}

    render() {
        return (
            <Layout>
                <h3>Movie!</h3>
            </Layout>
        );
    }
}

export default BoxOfficeMovie;