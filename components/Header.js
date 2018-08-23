import React, { Component } from "react";
import { Menu, Icon, Popup, Modal, Button, Embed, Label } from "semantic-ui-react";
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
                    <Popup trigger={<Menu.Item><Icon name="fly" /> FREE Airdrop<Label color="purple" floating>100</Label></Menu.Item>} content="Get 100 Kiitos coins for FREE from HeartBank!" />
                    <Popup trigger={<Menu.Item active><Icon color="grey" name="address book outline" fitted /></Menu.Item>} content={<span><strong>Your Account address on {this.state.network} network</strong>: {this.state.account}</span>} />
                </Menu.Menu>
            );
        } else if (this.props.page === "movie") {
            return (
                <Menu.Menu position="right">
                    <Menu.Item>Update Movie</Menu.Item>
                    <Menu.Item>Withdraw Fund</Menu.Item>
                    <Popup trigger={<Menu.Item><Icon name="ticket" /> CSB Tickets<Label color="purple" floating>22</Label></Menu.Item>} content={<span><strong>Your CSGS ticket balance</strong>: 32</span>} />
                    <Popup trigger={<Menu.Item active><Icon color="grey" name="address book outline" fitted /></Menu.Item>} content={<span><strong>Your Account address on {this.state.network} network</strong>: {this.state.account}</span>} />
                </Menu.Menu>
            );
        } else if (this.props.page === "theater") {
            return (
                <Menu.Menu position="right">
                    <Menu.Item color="teal">Spend Ticket</Menu.Item>

                    <Modal trigger={<Menu.Item>Watch Movie</Menu.Item>} size="fullscreen" dimmer="blurring" basic centered>
                        <Modal.Content><Embed hd autoplay id="-j1VYBvQnxE" placeholder="https://react.semantic-ui.com/images/wireframe/image.png" source="youtube" /></Modal.Content>
                    </Modal>

                    <Popup trigger={<Menu.Item><Icon name="users" /> Audience<Label color="purple" floating>22</Label></Menu.Item>} content={<span><strong>Your CSGS ticket balance</strong>: 32</span>} />
                    <Popup trigger={<Menu.Item active><Icon color="grey" name="address book outline" fitted /></Menu.Item>} content={<span><strong>Your Account address on {this.state.network} network</strong>: {this.state.account}</span>} />
                </Menu.Menu>
            );
        }
    }

    renderStyle() {
        return <style>
            {`.rotate {
                -webkit-transform: rotate(45deg);
                -moz-transform: rotate(45deg);
                -o-transform: rotate(45deg);
                -ms-transform: rotate(45deg);
                transform: rotate(45deg);
            }`}
        </style>;
    }

    render() {
        return (
            <Menu style={{marginTop: "20px"}}>
                {this.renderStyle()}
                <Menu.Menu position="left">
                    <Popup trigger={<Menu.Item><Icon className="rotate" color="red" name="heart" fitted /></Menu.Item>} content="Help contribute to this open source project on GitHub!" />
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

