import React, { Component } from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "../routes";
import { clientWeb3 as web3 } from "../scripts/web3";
import { Kiitos } from "../scripts/contracts";

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = { balance: 0 };
    }

    async componentDidMount() {
        const accounts = await web3.eth.getAccounts();
        const kiitos = await Kiitos.deployed();
        const balance = await kiitos.balanceOf(accounts[0]);
        this.setState({ balance: balance.toNumber() });
    }
    
    airDropButton() {} 

    render() {
        return (
            <Menu style={{marginTop: "20px"}}>
                <Link route="/"><a className="item">HeartBank Studio</a></Link>
    
                <Menu.Menu position="right">
                    <Menu.Item>Kiitos: {this.state.balance}</Menu.Item>
                    <Menu.Item>Airdrop Free Coins +</Menu.Item>
                </Menu.Menu>
            </Menu>
        );
    }
}

export default Header;

