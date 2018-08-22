import React, { Component } from "react";
import { Table } from "semantic-ui-react";
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
        const { Header, Row, HeaderCell, Body } = Table;
        return (
            <div>
                <h3>Withdrawal History</h3>
                <Table>
                    <Header>
                        <Row>
                            <HeaderCell>Date</HeaderCell>
                            <HeaderCell>Recipient</HeaderCell>
                            <HeaderCell>Amount</HeaderCell>
                            <HeaderCell>Expense</HeaderCell>
                        </Row>
                    </Header>
                    <Body>
                        {this.renderWithdrawals()}
                    </Body>
                </Table>
            </div>
        );
    }
}

export default Withdrawals;