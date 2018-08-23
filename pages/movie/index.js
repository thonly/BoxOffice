import React, { Component } from "react";
import { Progress, Grid, Statistic, List } from "semantic-ui-react";
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
                            

                            <List animated size="small" horizontal>
                                <List.Item>
                                    <List.Content>
                                        <List.Header>Listing Fee</List.Header>
                                        <List.Description>
                                            2 Kiitos
                                        </List.Description>
                                    </List.Content>
                                </List.Item>
                                <List.Item>
                                    <List.Content>
                                        <List.Header>Total Ticket Supply</List.Header>
                                        <List.Description>
                                            {this.props.tickets}
                                        </List.Description>
                                    </List.Content>
                                </List.Item>
                            </List>
                            <Progress color="yellow" percent={44} progress />

                        </Grid.Column>
                        <Grid.Column width={6} textAlign="center">
                        <Statistic.Group size="small" widths={2}>
                            <Statistic color="blue" size="small">
                                <Statistic.Value>$43,000</Statistic.Value>
                                <Statistic.Label>Crowd Funded</Statistic.Label>
                            </Statistic>
                            <Statistic color="orange">
                                <Statistic.Value>1,300</Statistic.Value>
                                <Statistic.Label>Tickets Pre-Sold</Statistic.Label>
                            </Statistic>
                            </Statistic.Group>
                            <Statistic.Group size="tiny" widths={2}>
                            <Statistic color="purple" style={{ marginTop: "20px" }}>
                                <Statistic.Value>$2</Statistic.Value>
                                <Statistic.Label>Ticket Price</Statistic.Label>
                            </Statistic>
                            <Statistic color="olive" style={{ marginTop: "20px" }}>
                                <Statistic.Value>425</Statistic.Value>
                                <Statistic.Label>Tickets Available</Statistic.Label>
                            </Statistic>
                            </Statistic.Group>
                            <Statistic.Group size="small" widths={1}>
                            <Statistic color="red" style={{ marginTop: "20px" }}>
                                <Statistic.Value>Dec 18</Statistic.Value>
                                <Statistic.Label>Sales Ends On</Statistic.Label>
                            </Statistic>
                            </Statistic.Group>

                            

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