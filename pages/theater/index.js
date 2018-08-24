import React, { Component } from "react";
import { Container, Embed, List, Label, Breadcrumb } from "semantic-ui-react";
import { currentOracle, Kiitos, BoxOffice } from "../../scripts/contracts";
import { Link } from "../../routes";
import Layout from "../../components/Layout";
import AudienceMembers from "../../components/contents/AudienceMembers";

class BoxOfficeTheater extends Component {
    static async getInitialProps(props) {
        const kiitos = await Kiitos.deployed();
        const supply = await kiitos.totalSupply();
        const boxOffice = await BoxOffice.deployed();
        const listingFee = await boxOffice.listingFee();
        const oracle = await currentOracle;
        const usdPriceOfEth = await oracle.usdPriceOfEth();

        return {movie: props.query.movie, supply: supply.toNumber(), listingFee: listingFee.toNumber(), usdPriceOfEth: usdPriceOfEth.toNumber()};
    }

    render() {
        return (
            <Layout page="theater" movie={this.props.movie}>
                <Embed hd id="-j1VYBvQnxE" placeholder="https://react.semantic-ui.com/images/wireframe/image.png" source="youtube" style={{ marginTop: "30px" }} />
                <Container style={{ marginTop: "8px" }}>
                    <Breadcrumb size="large">
                        <Link route="/"><Breadcrumb.Section link>Studio</Breadcrumb.Section></Link>
                        <Breadcrumb.Divider icon="right chevron" />
                        <Link route={`/movie/${this.props.movie}`}><Breadcrumb.Section link>Casablanca</Breadcrumb.Section></Link>
                        <Breadcrumb.Divider icon="right arrow" />
                        <Breadcrumb.Section active>Theater</Breadcrumb.Section>
                    </Breadcrumb>
                    <List horizontal floated="right">
                        <List.Item><Label color="teal" tag>New</Label></List.Item>
                        <List.Item><Label color="orange" tag>Upcoming</Label></List.Item>
                        <List.Item><Label color="red" tag>Featured</Label></List.Item>
                    </List>
                </Container>
                <AudienceMembers members={["0x1", "0x2"]} />
            </Layout>
        );
    }
}

export default BoxOfficeTheater;