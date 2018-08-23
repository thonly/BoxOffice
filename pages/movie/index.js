import React, { Component } from "react";
import { Progress, Grid, Statistic, List, Button, Segment, Icon } from "semantic-ui-react";
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
            <Layout page="movie">
                <Grid style={{ marginTop: "20px" }}>
                    <Grid.Row>
                        <Grid.Column width={7}>
                            
                            <MovieDetails {...this.props} />
                            

                           

                        </Grid.Column>
                        <Grid.Column width={9} textAlign="center">
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
                                    <Statistic.Value>10 Days</Statistic.Value>
                                    <Statistic.Label>Sales Ends In</Statistic.Label>
                                </Statistic>
                            </Statistic.Group>

                            <Button.Group fluid style={{ marginTop: "30px"}}>
                                <BuyTickets movie={this.props.movie}/>
                                <Button color="green" icon labelPosition="left"><Icon name="image" />Watch Movie</Button>
                            </Button.Group>
                            
                            <Segment style={{ margin: "20px 0" }}>
                                <List size="small" horizontal relaxed>
                                    <List.Item>
                                        <List.Content>
                                            <List.Header>Token Symbol</List.Header>
                                            <List.Description>
                                                CSB
                                            </List.Description>
                                        </List.Content>
                                    </List.Item>
                                    <List.Item>
                                        <List.Content>
                                            <List.Header>Total Available</List.Header>
                                            <List.Description>
                                                3,243,234
                                            </List.Description>
                                        </List.Content>
                                    </List.Item>
                                    <List.Item>
                                        <List.Content>
                                            <List.Header>Total Supply</List.Header>
                                            <List.Description>
                                                1,000,000
                                            </List.Description>
                                        </List.Content>
                                    </List.Item>
                                    <List.Item>
                                        <List.Content>
                                            <List.Header>Funding Goal</List.Header>
                                            <List.Description>
                                                $4,354,235
                                            </List.Description>
                                        </List.Content>
                                    </List.Item>
                                </List>
                            </Segment>
                            <Progress color="yellow" percent={34} progress />
                            

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