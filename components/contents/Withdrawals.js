import React, { Component } from "react";
import { Table, Button, Header } from "semantic-ui-react";
import web3, { BoxOffice } from "../../scripts/contracts";

class Withdrawals extends Component {
    constructor(props) {
        super(props);
        this.state = {
            withdrawals: []
        };
    }

    async componentDidMount() {
        const boxOffice = await BoxOffice.deployed();
        boxOffice.FundWithdrawn(null, { fromBlock: 0, toBlock: "latest" }, (err, res) => this.setState({ withdrawals: [...this.state.withdrawals, res.args] }));
    }

    renderWithdrawals() {
        const { Row, Cell } = Table;
        return this.state.withdrawals.filter(withdrawal => withdrawal.movie === this.props.movie)
            .map((withdrawal, index) => (
                <Row key={index}>
                    <Cell>{index}</Cell>
                    <Cell>{withdrawal.recipient}</Cell>
                    <Cell>{web3.utils.fromWei(withdrawal.amount.toString(), "ether")}</Cell>
                    <Cell>{withdrawal.expense}</Cell>
                </Row>
            ));
    }

    render() {
        return (
            <div>
            <Button content="Balance" active label={{ content: "$34,234" }} labelPosition="right" floated="right" />
                <Header>Withdrawal History</Header>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Date</Table.HeaderCell>
                            <Table.HeaderCell>Recipient</Table.HeaderCell>
                            <Table.HeaderCell>Amount</Table.HeaderCell>
                            <Table.HeaderCell>Expense</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {this.renderWithdrawals()}
                    </Table.Body>
                </Table>
            </div>
        );
    }
}

export default Withdrawals;