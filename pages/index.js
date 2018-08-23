import React, { Component } from "react";
import { Button, Grid, Icon, Sticky } from "semantic-ui-react";
import { currentOracle, Kiitos, BoxOffice } from "../scripts/contracts";
import { Link } from "../routes";
import Layout from "../components/Layout";
import BoxOfficeMovies from "../components/contents/BoxOfficeMovies";
import BoxOfficeStats from "../components/contents/BoxOfficeStats";

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

    updateFees() {}

    withdrawBoxOffice() {}

    shutDownBoxOffice() {} 

    render() {
        return (
            <Layout page="studio">
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={10}>
                            <BoxOfficeMovies films={this.props.films} />
                        </Grid.Column>
                        <Grid.Column width={6} textAlign="center" style={{ marginTop: "10px" }}>
                            <BoxOfficeStats />
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