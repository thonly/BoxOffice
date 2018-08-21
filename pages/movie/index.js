import React, { Component } from "react";
import { Card } from "semantic-ui-react";
import currentOracle, { Kiitos, BoxOffice, Movie } from "../../scripts/contracts";
import Layout from "../../components/Layout";

class BoxOfficeMovie extends Component {
    static async getInitialProps(props) {
        const kiitos = await Kiitos.deployed();
        const supply = await kiitos.totalSupply();
        const boxOffice = await BoxOffice.deployed();
        const listingFee = await boxOffice.listingFee();
        const oracle = await currentOracle;
        const usdPriceOfEth = await oracle.usdPriceOfEth();

        const movie = await Movie.at(props.query.address);
        const title = await movie.name();  
        const filmmaker = await movie.filmmaker();  
        const logline = await movie.logline();  
        const poster = await movie.poster();        

        return { title, filmmaker, logline, poster };
    }

    spendTicketButton() {}

    watchMovieButton() {}

    updateFilmPage() {}

    buyTicketsModal() {}

    withdrawFundModal() {}

    renderMovieSummary() {
        
    }

    renderMovieToken() {}

    renderWithdrawals() {}

    render() {
        return (
            <Layout>
                <Card
                    image={this.props.poster}
                    header={this.props.title}
                    meta={this.props.filmmaker}
                    description={this.props.logline}
                    fluid
                />
            </Layout>
        );
    }
}

export default BoxOfficeMovie;