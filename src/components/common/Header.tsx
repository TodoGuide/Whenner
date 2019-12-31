// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright (C) 2019  James Tharpe

import React from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Nav from "react-bootstrap/Nav";

const Header: React.FC = () => (
  <div>
    <Jumbotron>
      <h1 className="App-title">Whenner!</h1>
      <p>Answer "when're you gonna be done" like a Winner!</p>
    </Jumbotron>
    <Nav fill variant="tabs" activeKey={window.location.pathname}>
      <Nav.Item>
        <Nav.Link href="/">Tasks</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/calendar">Calendar</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/settings">Settings</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/about">About</Nav.Link>
      </Nav.Item>
    </Nav>
  </div>
);

export default Header;
