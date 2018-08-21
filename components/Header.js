import React from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "../routes";

export default () => {
    return (
        <Menu style={{marginTop: "20px"}}>
            <Link route="/"><a className="item">HeartBank Studio</a></Link>

            <Menu.Menu position="right">
                <Menu.Item>Kiitos: 100</Menu.Item>
                <Menu.Item>Airdrop Free Coins +</Menu.Item>
            </Menu.Menu>
        </Menu>
    );
};