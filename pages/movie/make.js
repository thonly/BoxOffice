import React, { Component } from "react";
import { Dimmer, Loader, Step, Icon } from "semantic-ui-react";
import web3, { Kiitos, BoxOffice } from "../../scripts/contracts";
import Layout from "../../components/Layout";
import UpdateFilm from "../../components/forms/UpdateFilm";
import makeShorter, { toDollars } from "../../scripts/offchainwork";

class MakeFilm extends Component {
    static async getInitialProps(props) {
        const kiitos = await Kiitos.deployed();
        const boxOffice = await BoxOffice.deployed();

        const accounts = await web3.eth.getAccounts();
        const kiitosBalance = await kiitos.balanceOf(accounts[0]);
        const [listingFee, withdrawFee, feesCollected, feesDonated ] = await boxOffice.getBoxOfficeStats();

        let ticketBalance = 0;
        if (props.query.movie) {
            const movie = await Movie.at(props.query.movie);
            ticketBalance = await movie.balanceOf(accounts[0]);
        }

        return { 
            movie: props.query.movie,
            feesCollected: await toDollars(feesCollected), 
            wallet: { 
                account: accounts[0], 
                kiitosBalance: makeShorter(kiitosBalance),
                ticketBalance: makeShorter(ticketBalance)
            }
        };
    }

    state = {
        dimmed: false
    };

    dimPage = () => this.setState({ dimmed: true });

    render() {
        return (
            <Dimmer.Dimmable blurring={this.state.dimmed} dimmed>
                <Layout page={this.props.movie ? "update" : "studio"} movie={this.props.movie} dimPage={this.dimPage} {...this.props.wallet} feesCollected={this.props.feesCollected}>
                    <Dimmer active={this.state.dimmed} page>
                        <Loader size="massive" >Connecting to Ethereum</Loader>
                    </Dimmer>
                    <Step.Group fluid size="large">
                        <Step active>
                        <Icon name="heart outline" color="red" />
                        <Step.Content>
                            <Step.Title>Support <span style={{ margin: "0 -2px 0 0" }}>Heart</span><Icon className="rotate" color="green" name="heart" fitted /><span style={{ margin: "0 0 0 1px" }}>ank</span></Step.Title>
                            <Step.Description>1. Buy Kiitos Coins</Step.Description>
                        </Step.Content>
                        </Step>
                        <Step active>
                        <Icon name="film" color="red" />
                        <Step.Content>
                            <Step.Title>Describe Film Project</Step.Title>
                            <Step.Description>2. Enter Movie Details</Step.Description>
                        </Step.Content>
                        </Step>
                        <Step active>
                        <Icon name="ticket" color="red" />
                        <Step.Content>
                            <Step.Title>Create Movie Tickets</Step.Title>
                            <Step.Description>3. Enter ERC20 Token Details</Step.Description>
                        </Step.Content>
                        </Step>
                    </Step.Group>
                    <UpdateFilm movie={this.props.movie}></UpdateFilm>
                </Layout>
            </Dimmer.Dimmable>
        );
    }
}

export default MakeFilm;