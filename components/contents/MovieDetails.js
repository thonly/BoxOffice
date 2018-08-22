import React from "react";
import { Card } from "semantic-ui-react";

export default ({ filmmaker, title, logline, poster }) => {
    return (
        <Card
            image={poster}
            header={title}
            meta={filmmaker}
            description={logline}
            extra="Official Trailer"
            fluid
        />
    );
}