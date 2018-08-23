import React, { Component } from "react";
import { Menu, Icon, Popup, Modal, Button } from "semantic-ui-react";
import { Link } from "../routes";
import web3, { Kiitos } from "../scripts/contracts";

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            network: "localhost",
            account: "0x0", 
            balance: 0,
            error: "",
        };
    }

    async componentWillMount() {
        const network = await web3.eth.net.getNetworkType();
        this.setState({ network });
        console.log(this.state.network);
    }

    async componentDidMount() {
        try {
            const accounts = await web3.eth.getAccounts();
            const kiitos = await Kiitos.deployed();
            const balance = await kiitos.balanceOf(accounts[0]);
            this.setState({ account: accounts[0], balance: balance.toNumber().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") });
        } catch(error) {
            this.setState({ error: error.message });
            console.log(this.state.error);
        }
    }
    
    airDropButton() {} 

    renderMenu() {
        if (this.props.page === "studio") {
            return (
                <Menu.Menu position="right">
                    <Popup trigger={<Menu.Item><strong>{this.state.balance} Kiitos</strong></Menu.Item>} content={<span><strong>Your Kiitos coin balance</strong>: {this.state.balance}</span>} />
                    <Popup trigger={<Menu.Item>FREE Airdrop</Menu.Item>} content="Get 100 Kiitos coins for FREE from HeartBank!" />
                    <Popup trigger={<Menu.Item active><Icon name="address book outline" fitted /></Menu.Item>} content={<span><strong>Your Account address on {this.state.network} network</strong>: {this.state.account}</span>} />
                </Menu.Menu>
            );
        } else if (this.props.page === "movie") {
            return (
                <Menu.Menu position="right">
                    <Menu.Item>Update Movie</Menu.Item>
                    <Menu.Item>Withdraw Fund</Menu.Item>
                    <Popup trigger={<Menu.Item><strong>32 Tickets</strong></Menu.Item>} content={<span><strong>Your CSGS ticket balance</strong>: 32</span>} />
                    <Popup trigger={<Menu.Item active><Icon name="address book outline" fitted /></Menu.Item>} content={<span><strong>Your Account address on {this.state.network} network</strong>: {this.state.account}</span>} />
                </Menu.Menu>
            );
        } else if (this.props.page === "theater") {

        }
    }

    render() {
        return (
            <Menu style={{marginTop: "20px"}}>
                <Menu.Menu position="left">
                    <Popup trigger={<Menu.Item><Icon name="github alternate" fitted /></Menu.Item>} content="Help contribute to our open source project!" />
                    <Link route="/"><a className="item active" title="Go to home page"><h4>HeartBank Studio</h4></a></Link>
                </Menu.Menu>
                {this.renderMenu()}
                <Modal open={!!this.state.error} basic size="small" centered>
                    <h2>Please install Metamask and connect to the Rinkeby network.</h2>
                    <Modal.Content style={{textAlign: "center"}}>
                        <Button color="green" inverted onClick={event => this.setState({ error: "" })}>I've completed these steps</Button>
                    </Modal.Content>
                </Modal>
            </Menu>                
        );
    }
}

export default Header;

