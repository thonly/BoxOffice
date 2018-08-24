import React, { Component } from "react";
import { Container, Divider, Modal, Button } from "semantic-ui-react";
import web3 from "../scripts/contracts";
import { Router } from "../routes";

class Footer extends Component {

    state = { 
        network: null
    };

    async componentDidMount() { // to fix: causes warning 
        if (typeof web3.currentProvider !== "undefined")
            this.setState({ network: await web3.eth.net.getNetworkType() });
    }

    render() {
        return (
            <Container textAlign="center" style={{ margin: "40px 0" }}>
                <Divider/>
                <small>HeartBank &copy; 2018</small>
                <Modal open={this.state.network !== "private" && this.state.network !== "rinkeby"} basic size="small" centered>
                    <h2>Please install Metamask and connect to the Rinkeby network.</h2>
                    <Modal.Content style={{textAlign: "center"}}>
                        <Button color="green" inverted onClick={event => Router.replaceRoute("/")}>I've completed these steps</Button>
                    </Modal.Content>
                </Modal>
            </Container>
        );
    }
}

export default Footer;