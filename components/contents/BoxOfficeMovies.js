import React from "react";
import { Container, Card, Icon, Header, Label } from "semantic-ui-react";
import { Link } from "../../routes";
    
const renderFilms = films => {
        const items = films.map((address, index) => 
            <Card color="brown" fluid raised key={index}>
                <Card.Content>
                    <Label color="brown" ribbon="right">Featured</Label>
                    <Card.Header style={{ marginTop: "-25px"}}><Header color="brown"><Icon name="film" /> {address}</Header></Card.Header>
                    <Card.Meta>ERC20 Token Address</Card.Meta>
                    <Card.Description>Movie tickets are ERC20 compatible!</Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Link route={`/movie/${address}`}><a><Icon name="ticket" /> Buy Movie Tickets</a></Link>
                </Card.Content>
            </Card>);
        return <Card.Group>{items}</Card.Group>;
}

export default ({ films }) => 
    <Container>
        <Header>Film Projects in Development<Label color="brown" horizontal>2</Label></Header>         
        {renderFilms(films)};
    </Container>;