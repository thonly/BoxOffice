import React, { Component } from "react";
import { Menu, Icon, Popup, Modal, Embed, Label } from "semantic-ui-react";
import { Link, Router } from "../routes";
import web3, { Kiitos, Movie } from "../scripts/contracts";
import WithdrawFund from "../components/forms/WithdrawFund";

class Header extends Component {

    state = {
        pending: false
    };

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
    
    renderMenu() {
        if (this.props.page === "studio") {
            return (
                <Menu.Menu position="right">
                    <Popup trigger={<Menu.Item><strong><Icon name="moon outline" /> {this.props.kiitosBalance} Kiitos</strong></Menu.Item>} content="Your Kiitos coin balance!" />
                    <Popup trigger={<Menu.Item><Icon name="fly" /> FREE Airdrop<Label color="purple" floating>100</Label></Menu.Item>} content="Get 100 Kiitos coins for FREE from HeartBank!" />
                    <Popup trigger={<Menu.Item active><Icon color="grey" name="address book outline" fitted /></Menu.Item>} content={<span><strong>Your account address</strong>: {this.props.account}</span>} />
                </Menu.Menu>
            );
        } else if (this.props.page === "movie") {
            return (
                <Menu.Menu position="right">
                    <Link route={`/movie/${this.props.movie}/update`}><Menu.Item><Icon name="edit outline" /> Update Movie</Menu.Item></Link>
                    <Menu.Item><WithdrawFund movie={this.props.movie} /></Menu.Item>
                    <Popup trigger={<Menu.Item><Icon name="ticket" /> {this.props.ticketSymbol} Tickets<Label color="purple" floating>{this.props.ticketBalance}</Label></Menu.Item>} content={<span>Your {this.props.ticketSymbol} ticket balance!</span>} />
                    <Popup trigger={<Menu.Item active><Icon color="grey" name="address book outline" fitted /></Menu.Item>} content={<span><strong>Your account address</strong>: {this.props.account}</span>} />
                </Menu.Menu>
            );
        } else if (this.props.page === "update") {
            return (
                <Menu.Menu position="right">
                    <Link route={`/movie/${this.props.movie}`}><Menu.Item><Icon name="arrow left" /> Casablanca</Menu.Item></Link>
                    <Menu.Item><WithdrawFund movie={this.props.movie} /></Menu.Item>
                    <Popup trigger={<Menu.Item><Icon name="ticket" /> {this.props.ticketSymbol} Tickets<Label color="purple" floating>{this.props.ticketBalance}</Label></Menu.Item>} content={<span>Your {this.props.ticketSymbol} ticket balance</span>} />
                    <Popup trigger={<Menu.Item active><Icon color="grey" name="address book outline" fitted /></Menu.Item>} content={<span><strong>Your account address</strong>: {this.props.account}</span>} />
                </Menu.Menu>
            );
        } else if (this.props.page === "theater") {
            return (
                <Menu.Menu position="right">
                    <Menu.Item color="teal"><Icon name="ticket" /> Spend Ticket</Menu.Item>
                    <Modal trigger={<Menu.Item><Icon name="video camera" /> Watch Movie</Menu.Item>} size="fullscreen" dimmer="blurring" basic centered>
                        <Modal.Content><Embed hd autoplay id={this.props.trailer} placeholder={`https://ipfs.infura.io/ipfs/${this.props.poster}`} source="youtube" /></Modal.Content>
                    </Modal>
                    <Popup trigger={<Menu.Item><Icon name="users" /> Audience<Label color="purple" floating>{this.props.audience}</Label></Menu.Item>} content={<span>Audience members who are watching too!</span>} />
                    <Popup trigger={<Menu.Item active><Icon color="grey" name="address book outline" fitted /></Menu.Item>} content={<span><strong>Your account address</strong>: {this.props.account}</span>} />
                </Menu.Menu>
            );
        }
    }

    airDrop = async event => {
        const accounts = await web3.eth.getAccounts();
        const kiitos = await Kiitos.deployed();
    };

    spendTicket = async event => {
        const accounts = await web3.eth.getAccounts();
        const movie = await Movie.at(this.props.movie);
    };

    render() {
        return (
            <Menu style={{margin: "20px 0"}}>
                {this.renderStyle()}
                <Modal open={this.state.pending} basic centered>
                    <Header inverted size="huge" textAlign="center">Please confirm this transaction with Metamask.</Header>
                </Modal>
                <Menu.Menu position="left">
                    <Popup trigger={<Menu.Item as="a" href="https://github.com/HeartBankStudio/BoxOffice" target="_blank"><Icon className="rotate" color="red" name="heart" fitted /></Menu.Item>} content="Help contribute to this open source project on GitHub!" />
                    <Link route="/"><Menu.Item active title="Go to home page" onClick={event => {if (this.props.page !== "studio") this.props.dimPage()}}><h4>HeartBank Studio</h4></Menu.Item></Link>    
                </Menu.Menu>
                {this.renderMenu()}
            </Menu>
        );
    }
}

export default Header;

