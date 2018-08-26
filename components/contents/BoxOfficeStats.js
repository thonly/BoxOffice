import React from "react";
import { Container, Statistic, List, Segment } from "semantic-ui-react";

export default ({fundsCollected, ticketsSold, listingFee, withdrawFee, feesDonated}) => 
    <Container>
        <Statistic.Group widths={1}>
            <Statistic color="blue">
                <Statistic.Value>{fundsCollected}</Statistic.Value>
                <Statistic.Label>Crowd Funded</Statistic.Label>
            </Statistic>
        </Statistic.Group>
        <Statistic.Group widths={1} style={{ marginTop: "20px" }}>
            <Statistic color="orange">
                <Statistic.Value>{ticketsSold}</Statistic.Value>
                <Statistic.Label>Tickets Pre-Sold</Statistic.Label>
            </Statistic>
        </Statistic.Group>
        <Statistic.Group widths={1} size="small" style={{ marginTop: "20px" }}>
            <Statistic color="pink">
                <Statistic.Value>{feesDonated}</Statistic.Value>
                <Statistic.Label>Donated to Charity</Statistic.Label>
            </Statistic>
        </Statistic.Group>
        <Segment raised piled style={{ margin: "30px 0" }}>
            <List size="large" relaxed="very" horizontal>
                <List.Item>
                    <List.Content>
                        <List.Header>Listing Fee</List.Header>
                        <List.Description>
                            {listingFee} Kiitos
                        </List.Description>
                    </List.Content>
                </List.Item>
                <List.Item>
                    <List.Content>
                        <List.Header>Withdraw Fee</List.Header>
                        <List.Description>
                            {withdrawFee} Percent
                        </List.Description>
                    </List.Content>
                </List.Item>
            </List>
        </Segment>
    </Container>;