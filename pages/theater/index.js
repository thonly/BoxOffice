import React, { Component } from "react";
import { Embed, Segment, List, Label } from "semantic-ui-react";
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

    renderAudienceMembers() {
        const members = ["0x1", "0x2"];
        return <List divided relaxed="very" horizontal link>{members.map((member, index) => <List.Item as="a" key={index}><List.Icon color="brown" name="user circle" /> {member}</List.Item>)}</List>;
    } 

    render() {
        return (
            <Layout page="theater">
                <Embed hd id="-j1VYBvQnxE" placeholder="https://react.semantic-ui.com/images/wireframe/image.png" source="youtube" style={{ marginTop: "25px" }} />
                
                <List horizontal floated="right" style={{ marginTop: "8px" }}>
                    <List.Item><Label color="teal" tag>New</Label></List.Item>
                    <List.Item><Label color='orange' tag>Upcoming</Label></List.Item>
                    <List.Item><Label color='red' tag>Featured</Label></List.Item>
                </List>
                <Segment raised piled style={{ marginTop: "50px" }}>
                    {this.renderAudienceMembers()}
                </Segment>
            </Layout>
        );
    }
}

export default BoxOfficeTheater;