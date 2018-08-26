import React, { Component } from "react";
import { Progress, Grid, Button, Icon, Dimmer, Loader } from "semantic-ui-react";
import web3, { BoxOffice, Movie } from "../../scripts/contracts";
import { Link } from "../../routes";
import Layout from "../../components/Layout";
import MovieDetails from "../../components/contents/MovieDetails";
import MovieStats from "../../components/contents/MovieStats";
import TokenDetails from "../../components/contents/TokenDetails";
import BuyTickets from "../../components/forms/BuyTickets";
import Withdrawals from "../../components/contents/Withdrawals";
import makeShorter, { toDollars } from "../../scripts/offchainwork";

class BoxOfficeMovie extends Component {
    static async getInitialProps(props) {
        const boxOffice = await BoxOffice.deployed();
        const [listingFee, withdrawFee, feesCollected, feesDonated ] = await boxOffice.getBoxOfficeStats();

        const movie = await Movie.at(props.query.movie);
        const [ filmmaker, createdTime, salesEndDate, availableTickets, price, movieName, ticketSymbol, logline, poster, trailer ] = await movie.getFilmSummary();
        const [ sales, fund, ticketsSold, availableSupply, ticketSupply ] = await movie.getFilmStats();
        
        const accounts = await web3.eth.getAccounts();
        const balance = await movie.balanceOf(accounts[0]);

        return { 
            feesCollected: await toDollars(feesCollected),
            movie: props.query.movie, 
            fund: await toDollars(fund),
            film: {
                createdTime: createdTime*1000,
                filmmaker,
                movieName,
                logline,
                poster,
                trailer
            },
            token: {
                ticketSymbol,
                availableSupply: makeShorter(availableSupply),
                ticketSupply: makeShorter(ticketSupply),
                fundingGoal: await toDollars(price*ticketSupply)
            },
            wallet: { 
                ticketSymbol,
                account: accounts[0], 
                balance: makeShorter(balance) 
            }, 
            stats: {
                salesEndDate: salesEndDate*1000,
                price: await toDollars(price),
                availableTickets: makeShorter(availableTickets),
                ticketsSold: makeShorter(ticketsSold),
                sales: await toDollars(sales)
            }
        };
    }

    state = {
        withdrawals: [],
        dimmed: false
    };

    dimPage = () => this.setState({ dimmed: true });

    async componentDidMount() {
        const boxOffice = await BoxOffice.deployed();
        boxOffice.FundWithdrawn(null, { fromBlock: 0, toBlock: "latest" }, (err, res) => this.setState({ withdrawals: [res.args, ...this.state.withdrawals] }));
    }

    render() {
        return (
            <Dimmer.Dimmable blurring={this.state.dimmed} dimmed>
                <Layout page="movie" movie={this.props.movie} dimPage={this.dimPage} feesCollected={this.props.feesCollected} {...this.props.wallet}>
                    <Dimmer active={this.state.dimmed} page>
                        <Loader size="massive" >Connecting to Ethereum</Loader>
                    </Dimmer>
                    <Grid style={{ marginTop: "20px" }}>
                        <Grid.Row>
                            <Grid.Column width={7}>   
                                <MovieDetails movie={this.props.movie} {...this.props.film} />
                            </Grid.Column>
                            <Grid.Column width={9} textAlign="center">
                                <MovieStats {...this.props.stats} />
                                <Button.Group fluid style={{ marginTop: "30px"}}>
                                    <BuyTickets movie={this.props.movie}/>
                                    <Link route={`/theater/${this.props.movie}`}><Button onClick={event => this.dimPage()} color="green" icon labelPosition="left"><Icon name="image" />Watch Movie</Button></Link>
                                </Button.Group>
                                <TokenDetails {...this.props.token} />
                                <Progress color="yellow" percent={this.props.stats.ticketsSold/this.props.token.ticketSupply*100} progress />
                            </Grid.Column>   
                        </Grid.Row>      
                        <Grid.Row>
                            <Grid.Column width={16}>
                                <Withdrawals movie={this.props.movie} fund={this.props.fund} withdrawals={this.state.withdrawals} />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Layout>
            </Dimmer.Dimmable>
        );
    }
}

export default BoxOfficeMovie;