import React, { Component } from "react";
import { Card, Grid } from "semantic-ui-react";
import web3, { currentOracle, Kiitos, BoxOffice, Movie } from "../../scripts/contracts";
import Layout from "../../components/Layout";
import BuyTickets from "../../components/forms/BuyTickets";

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
        
        const accounts = await web3.eth.getAccounts();
        const tickets = await movie.balanceOf(accounts[0]);

        return { movie: props.query.address, title, filmmaker, logline, poster, tickets: tickets.toNumber() };
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
                <Grid>
                    <Grid.Column width={10}>
                        <Card
                            image={this.props.poster}
                            header={this.props.title}
                            meta={this.props.filmmaker}
                            description={this.props.logline}
                            fluid
                        />
                    </Grid.Column>
                    <Grid.Column withd={6}>
                        <h3>Movie Token Details</h3>
                        <span>Tickets: {this.props.tickets}</span>
                        <BuyTickets movie={this.props.movie}/>
                    </Grid.Column>    
                </Grid>
                <h3>Withdraw History</h3>
            </Layout>
        );
    }
}

export default BoxOfficeMovie;