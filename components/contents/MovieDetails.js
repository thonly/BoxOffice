import React from "react";
import { Card, Header, Icon, Image, Label } from "semantic-ui-react";

export default ({ movie, title, logline, poster }) => {
    return (
        <Card color="brown" fluid raised>
            <Image src="https://react.semantic-ui.com/images/wireframe/image.png" fluid />
            <Card.Content>
                <Label color="orange" corner="left"><Icon name="hotjar" /></Label>
                <Card.Header><Header color="brown"><Icon name="film" />{title}</Header></Card.Header>
                <Card.Meta>{movie}</Card.Meta>
                <Card.Description>{logline}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <strong>First Ticket Sale</strong>: June 2, 2018
            </Card.Content>
        </Card>
    );
}