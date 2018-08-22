import React, { Component } from "react";
import { Card, Grid } from "semantic-ui-react";
import web3, { currentOracle, Kiitos, BoxOffice, Movie } from "../../scripts/contracts";
import Layout from "../../components/Layout";
import BuyTickets from "../../components/forms/BuyTickets";
import Withdrawals from "../../components/contents/Withdrawals";
import WithdrawFund from "../../components/forms/WithdrawFund";
import MovieDetails from "../../components/contents/MovieDetails";

class BoxOfficeMovie extends Component {
    static async getInitialProps(props) {
        const kiitos = await Kiitos.deployed();
        const supply = await kiitos.totalSupply();
        const boxOffice = await BoxOffice.deployed();
        const listingFee = await boxOffice.listingFee();
        const oracle = await currentOracle;
        const usdPriceOfEth = await oracle.usdPriceOfEth();

        const movie = await Movie.at(props.query.movie);
        const title = await movie.name();  
        const filmmaker = await movie.filmmaker();  
        const logline = await movie.logline();  
        const poster = await movie.poster(); 
        
        const accounts = await web3.eth.getAccounts();
        const tickets = await movie.balanceOf(accounts[0]);

        return { movie: props.query.movie, title, filmmaker, logline, poster, tickets: tickets.toNumber() };
    }

    render() {
        return (
            <Layout>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={10}>
                            <MovieDetails {...this.props} />
                        </Grid.Column>
                        <Grid.Column width={6}>
                            <h3>Token Details</h3>
                            <span>Tickets: {this.props.tickets}</span>
                        </Grid.Column>   
                    </Grid.Row> 
                    <Grid.Row>
                        <Grid.Column width={4}>
                            <BuyTickets movie={this.props.movie}/>
                        </Grid.Column>
                        <Grid.Column width={4}>
                            Watch Movie
                        </Grid.Column>
                        <Grid.Column width={4}>
                            <WithdrawFund movie={this.props.movie} />
                        </Grid.Column>
                        <Grid.Column width={4}>
                            Update Movie
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={16}>
                            <Withdrawals movie={this.props.movie} />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                
            </Layout>
        );
    }
}

export default BoxOfficeMovie;