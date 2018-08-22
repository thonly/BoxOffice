import React, { Component } from "react";
import { currentOracle, Kiitos, BoxOffice } from "../scripts/contracts";
import { Card, Button } from "semantic-ui-react";
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
        const items = this.props.films.map(address => {
            return {
                header: address,
                description: (
                    <Link route={`/movie/${address}`}>
                        <a>View Movie</a>
                    </Link>
                ),
                fluid: true
            }
        });

        return <Card.Group items={items} />;
    }

    render() {
        return (
            <Layout>
                <div>
                    <h3>Open Movies</h3>
                    <Link route="/movie/make">
                        <a>
                            <Button 
                                content="Create Movie"
                                icon="add circle"
                                floated="right"
                                primary
                            />
                        </a>
                    </Link>
                    {this.renderBoxOfficeMovies()}
                </div>
            </Layout>
        );
    }
}

export default TicketBooth;