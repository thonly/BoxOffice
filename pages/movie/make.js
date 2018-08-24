import React, { Component } from "react";
import { Router } from "../../routes";
import { Form, Input, Button, Message, Dimmer, Loader, Step, Icon, Label } from "semantic-ui-react";
import Layout from "../../components/Layout";
import web3, { currentOracle, Kiitos, BoxOffice, Movie } from "../../scripts/contracts";
import ipfs from "../../scripts/ipfs";

class MakeFilm extends Component {
    state = {
        salesEndTime: Date.now()/1000 + 28*60*60*24 | 0,
        price: web3.utils.toWei("1", "finney"),
        ticketSupply: web3.utils.toWei("1", "ether"),
        movieName: "Casablanca",
        ticketSymbol: "CSBC",
        logline: "An American expatriate meets a former lover, with unforeseen complications.",
        poster: "https://en.wikipedia.org/wiki/Casablanca_(film)#/media/File:CasablancaPoster-Gold.jpg",
        trailer: "https://www.imdb.com/title/tt0034583",
        buffer: null,
        ipfsHash: "",
        loading: false,
        error: "",
        dimmed: false
    };

    dimPage = () => this.setState({ dimmed: true });

    submitToInfura = event => {
        event.preventDefault();
        this.setState({ dimmed: true });
        const image = event.target.files[0];
        const reader = new window.FileReader();
        reader.readAsArrayBuffer(image);
        reader.onloadend = () => {
            ipfs.files.add(Buffer(reader.result), (err, res) => {
                if (err) {
                    this.setState({ error: err.message });
                } else {
                    this.setState({ ipfsHash: res[0].hash });
                }
                this.setState({ dimmed: false });
            });
        };     
    };

    onSubmit = async event => {
        event.preventDefault();
        this.setState({ loading: true, error: "" });

        try {
            const accounts = await web3.eth.getAccounts();
            const oracle = await currentOracle;
            const boxOffice = await BoxOffice.deployed();
            const kiitos = await Kiitos.deployed();

            // await oracle.setPrice(400, {from: accounts[0]});
            // await boxOffice.updateFees(2, 3, {from: accounts[0]});

            // const film = await boxOffice.films(0);
            // const movie = await Movie.at(film);
            // await movie.updateFilm(this.state.salesEndTime, this.state.price, this.state.movieName, this.state.ticketSymbol, this.state.logline, this.state.poster, this.state.trailer, {from: accounts[0]});
            
            await boxOffice.makeFilm(this.state.salesEndTime, this.state.price, this.state.ticketSupply, this.state.movieName, this.state.ticketSymbol, this.state.logline, this.state.poster, this.state.trailer, {from: accounts[0]});
            Router.pushRoute("/");
        } catch (error) {
            this.setState({ error: error.message });
        }

        this.setState({ loading: false });
    };

    render() {
        return (
            <Dimmer.Dimmable blurring={this.state.dimmed} dimmed>
                <Layout page="studio" movie={null} dimPage={this.dimPage}>
                    <Dimmer active={this.state.dimmed} page>
                        <Loader size="massive" >Page loading</Loader>
                    </Dimmer>

                    <Step.Group fluid size="small">
                        <Step>
                        <Icon name="heart outline" color="red" />
                        <Step.Content>
                            <Step.Title>Support <span style={{ margin: "0 -2px 0 0" }}>Heart</span><Icon className="rotate" color="green" name="heart" fitted /><span style={{ margin: "0 0 0 1px" }}>ank</span></Step.Title>
                            <Step.Description>Buy Kiitos Coins</Step.Description>
                        </Step.Content>
                        </Step>
                        <Step>
                        <Icon name="film" color="red" />
                        <Step.Content>
                            <Step.Title>Describe Film Project</Step.Title>
                            <Step.Description>Enter Movie Details</Step.Description>
                        </Step.Content>
                        </Step>
                        <Step>
                        <Icon name="ticket" color="red" />
                        <Step.Content>
                            <Step.Title>Create Movie Tickets</Step.Title>
                            <Step.Description>Enter ERC20 Token Details</Step.Description>
                        </Step.Content>
                        </Step>
                    </Step.Group>

                    

                    <img width={500} src={this.state.ipfsHash && `https://ipfs.infura.io/ipfs/${this.state.ipfsHash}`} />
                        <Label as="label" htmlFor="file" size="big">
                            <Icon name="file" />Upload Poster to IPFS
                        </Label>
                        <input id="file" hidden type="file" onChange={this.submitToInfura} />
                        

                    <Form onSubmit={this.onSubmit} error={!!this.state.error}>
                        <Form.Field>
                            <label>Ticket Price</label>
                            <Input 
                                label="wei" 
                                labelPosition="right" 
                                value={this.props.price}
                                onChange={event => this.setState({ price: event.target.value })}
                            />
                            <Message error header="Oops!" content={this.state.error} />
                            <Button loading={this.state.loading} primary >Create!</Button>
                        </Form.Field>
                    </Form>
                </Layout>
            </Dimmer.Dimmable>
        );
    }
}

export default MakeFilm;