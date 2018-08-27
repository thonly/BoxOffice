import React, { Component } from "react";
import { Modal, Form, Button, Message, Input, Icon } from "semantic-ui-react";
import { Router } from "../../routes";
import getAccount, { BoxOffice } from "../../scripts/contracts";

class WithdrawFund extends Component {
    state = {
        recipient: "",
        ether: "",
        expense: "",
        open: false,
        loading: false,
        error: ""
    };

    onSubmit = async event => {
        event.preventDefault();

        const { recipient, ether, expense } = this.state;

        this.setState({ loading: true, error: "" });

        try {
            const account = await getAccount();
            const boxOffice = await BoxOffice.deployed();

            await boxOffice.withdrawFund(this.props.movie, recipient, web3.utils.toWei(ether, "ether"), expense, {from: account});
            this.setState({ open: false });
            Router.replaceRoute(`/movie/${this.props.movie}`);
        } catch(error) {
            this.setState({ error: error.message });
        }

        this.setState({ loading: false });
        
    };

    render() {
        return (
            <Modal open={this.state.open} trigger={<Button icon labelPosition="left" color="grey" onClick={event => this.setState({open: true})}><Icon name="dollar sign" />Withdraw Fund</Button>}>
                <Modal.Header>Withdraw Fund!</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <Form onSubmit={this.onSubmit} error={!!this.state.error}>
                            <Form.Field>
                                <label>Recipient:</label>
                                <Input 
                                    value={this.state.recipient}
                                    onChange={event => this.setState({ recipient: event.target.value })}
                                />
                            </Form.Field>
                            <Form.Field>
                                <label>Amount:</label>
                                <Input 
                                    value={this.state.ether}
                                    onChange={event => this.setState({ ether: event.target.value })}
                                    label="ether"
                                    labelPosition="right"
                                />
                            </Form.Field>
                            <Form.Field>
                                <label>Expense Description:</label>
                                <Input 
                                    value={this.state.expense}
                                    onChange={event => this.setState({ expense: event.target.value })}
                                />
                            </Form.Field>
                            <Message error header="All fields are required." content={this.state.error} />
                            <Button color="yellow" loading={this.state.loading}>Withdraw from Fund!</Button>
                        </Form>
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        );
    }
}

export default WithdrawFund;