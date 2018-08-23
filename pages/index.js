import React, { Component } from "react";
import { currentOracle, Kiitos, BoxOffice } from "../scripts/contracts";
import { Card, Button, Grid, Icon, Header, Statistic, Sticky, List, Label, Segment } from "semantic-ui-react";
import { Link } from "../routes";
import Layout from "../components/Layout";

class HeartBankStudio extends Component {
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
        const items = this.props.films.map((address, index) => 
            <Card color="brown" fluid raised>
                <Card.Content>
                    <Label color="brown" ribbon="right">Featured</Label>
                    <Card.Header style={{ marginTop: "-25px"}}><Header color="brown"><Icon name="film" /> {address}</Header></Card.Header>
                    <Card.Meta>ERC20 Token Address</Card.Meta>
                    <Card.Description>Movie tickets are ERC20 compatible!</Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Link route={`/movie/${address}`}><a><Icon name="ticket" /> Buy Movie Tickets</a></Link>
                </Card.Content>
            </Card>);

        return <Card.Group>{items}</Card.Group>;
    }

    render() {
        return (
            <Layout page="studio">
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={10}>
                            <Header>Film Projects in Development<Label color="brown" horizontal>2</Label></Header>
                            
                            {this.renderBoxOfficeMovies()}
                        </Grid.Column>
                        <Grid.Column width={6} textAlign="center" style={{ marginTop: "10px" }}>
                            <Statistic.Group widths={1}>
                                <Statistic color="blue">
                                    <Statistic.Value>$133,000</Statistic.Value>
                                    <Statistic.Label>Crowd Funded</Statistic.Label>
                                </Statistic>
                            </Statistic.Group>
                            <Statistic.Group widths={1} style={{ marginTop: "20px" }}>
                                <Statistic color="orange">
                                    <Statistic.Value>31,200</Statistic.Value>
                                    <Statistic.Label>Tickets Pre-Sold</Statistic.Label>
                                </Statistic>
                            </Statistic.Group>
                            <Statistic.Group widths={1} size="small" style={{ marginTop: "20px" }}>
                                <Statistic color="pink">
                                    <Statistic.Value>$2,334</Statistic.Value>
                                    <Statistic.Label>Donated to Charity</Statistic.Label>
                                </Statistic>
                            </Statistic.Group>

                            <Segment raised piled style={{ margin: "30px 0" }}>
                            <List size="large" relaxed="very" horizontal>
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
                            </Segment>
                            <Sticky>
                                <Link route="/movie/make">
                                    <Button labelPosition="left" icon size="medium" fluid color="green" as="a"><Icon name="video camera" />Create ERC20 Tickets for your Film!</Button>
                                </Link>
                            </Sticky>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Layout>
        );
    }
}

export default HeartBankStudio;