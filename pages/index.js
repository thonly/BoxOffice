import React, { Component } from "react";
import { currentOracle, Kiitos, BoxOffice } from "../scripts/contracts";
import { Card, Button, Grid, Icon, Header, Statistic, Sticky, List } from "semantic-ui-react";
import { Link } from "../routes";
import Layout from "../components/Layout";

class TicketBooth extends Component {
    static async getInitialProps() {
        const kiitos = await Kiitos.deployed();
        const supply = await kiitos.totalSupply();
        const boxOffice = await BoxOffice.deployed();
        const listingFee = await boxOffice.listingFee();
        const oracle = await currentOracle;
        const usdPriceOfEth = await oracle.usdPriceOfEth();

        const films = await boxOffice.getFilms();

        return { films };
    }

    shutDownBoxOfficeButton() {} // show dark background modal to verify

    makeFilmPage() {}

    updateFeesModal() {}

    returnPaymentModal() {}

    renderBoxOfficeStats() {}

    renderBoxOfficeMovies() {
        const items = this.props.films.map((address, index) => {
            return {
                header: <Header color="brown"><Icon name="film" /> {address}</Header>,
                meta: "ERC20 Token Address",
                description: "Movie tickets are ERC20 compatible!",
                extra: (
                    <Link route={`/movie/${address}`}>
                        <a><Icon name="ticket" /> Buy Movie Tickets</a>
                    </Link>
                ),
                fluid: true,
                raised: true,
                color: "brown",
                key: index
                // link: true,
                // href: "",
            }
        });

        return <Card.Group items={items} />;
    }

    render() {
        return (
            <Layout>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={10}>
                            <h3>Film Projects in Development (2)</h3>
                            {this.renderBoxOfficeMovies()}
                        </Grid.Column>
                        <Grid.Column width={6} textAlign="center" style={{ marginTop: "10px" }}>
                            <Statistic color="blue">
                                <Statistic.Value>$133,000</Statistic.Value>
                                <Statistic.Label>Crowd Funded</Statistic.Label>
                            </Statistic>
                            <Statistic color="orange">
                                <Statistic.Value>31,200</Statistic.Value>
                                <Statistic.Label>Tickets Pre-Sold</Statistic.Label>
                            </Statistic>
                            <Statistic color="pink" size="small" style={{ marginTop: "20px" }}>
                                <Statistic.Value>$2,334</Statistic.Value>
                                <Statistic.Label>Donated to Charity</Statistic.Label>
                            </Statistic>
                            <List animated size="large" relaxed="very" horizontal style={{ margin: "30px 0" }}>
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
                                        <List.Header>Withdraw Fee</List.Header>
                                        <List.Description>
                                            1 Percent
                                        </List.Description>
                                    </List.Content>
                                </List.Item>
                            </List>

                            <Sticky>
                                <Link route="/movie/make">
                                    <Button size="medium" fluid color="green" as="a" content={<h4>Create ERC20 Movie Tickets for your Film!</h4>} />
                                </Link>
                            </Sticky>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Layout>
        );
    }
}

export default TicketBooth;