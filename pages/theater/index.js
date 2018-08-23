import React, { Component } from "react";
import { Embed, Segment, Header } from "semantic-ui-react";
import { currentOracle, Kiitos, BoxOffice } from "../../scripts/contracts";
import Layout from "../../components/Layout";

class BoxOfficeTheater extends Component {
    static async getInitialProps() {
        const kiitos = await Kiitos.deployed();
        const supply = await kiitos.totalSupply();
        const boxOffice = await BoxOffice.deployed();
        const listingFee = await boxOffice.listingFee();
        const oracle = await currentOracle;
        const usdPriceOfEth = await oracle.usdPriceOfEth();

        return {supply: supply.toNumber(), listingFee: listingFee.toNumber(), usdPriceOfEth: usdPriceOfEth.toNumber()};
    }

    spendTicketButton() {}

    renderStageScreen() {} // show trailer // button goes to dark background with movie clip

    renderAudienceMembers() {} 

    render() {
        return (
            <Layout page="theater">
                <Embed hd id="-j1VYBvQnxE" placeholder="https://react.semantic-ui.com/images/wireframe/image.png" source="youtube" style={{ marginTop: "25px" }} />
                <Header>Audience Members</Header>
                <Segment>
                    0x
                </Segment>
            </Layout>
        );
    }
}

export default BoxOfficeTheater;