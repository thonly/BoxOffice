import React, { Component } from "react";
import { Menu, Icon, Popup } from "semantic-ui-react";
import { Link } from "../routes";
import web3, { Kiitos } from "../scripts/contracts";

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = { account: "0x0", balance: 0 };
    }

    async componentDidMount() {
        const accounts = await web3.eth.getAccounts();
        const kiitos = await Kiitos.deployed();
        const balance = await kiitos.balanceOf(accounts[0]);
        this.setState({ account: accounts[0], balance: balance.toNumber().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") });
    }
    
    airDropButton() {} 

    render() {
        return (
            <Menu style={{marginTop: "20px"}}>
                <Menu.Menu position="left">
                    <Popup trigger={<Menu.Item><Icon name="github alternate" fitted /></Menu.Item>} content="Help contribute to our open source project!" />
                    <Link route="/"><a className="item active"><h4>HeartBank Studio</h4></a></Link>
                </Menu.Menu>
    
                <Menu.Menu position="right">
                    <Popup trigger={<Menu.Item><strong>Kiitos:</strong> {this.state.balance}</Menu.Item>} content="Your Kiitos Coin Balance!" />
                    <Popup trigger={<Menu.Item>FREE Airdrop</Menu.Item>} content="Get 100 Kiitos Coins for FREE!" />
                    <Popup trigger={<Menu.Item active><Icon name="address book outline" fitted /></Menu.Item>} content={<span><strong>Your Account Address:</strong> {this.state.account}</span>} />
                </Menu.Menu>
            </Menu>
        );
    }
}

export default Header;

