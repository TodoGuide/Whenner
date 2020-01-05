// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright (C) 2019  James Tharpe

import React from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import { LinkContainer } from "react-router-bootstrap";
import Nav from "react-bootstrap/Nav";

const Header: React.FC = () => (
  <div>
    <Jumbotron>
      <h1 className="App-title">Whenner!</h1>
      <p>Answer "when're you gonna be done" like a Winner!</p>
    </Jumbotron>
    <Nav fill variant="tabs" activeKey={window.location.pathname}>
      <Nav.Item as={LinkContainer} exact to="/">
        <Nav.Link active={false}>Tasks</Nav.Link>
      </Nav.Item>
      <Nav.Item as={LinkContainer} exact to="/calendar">
        <Nav.Link active={false}>Calendar</Nav.Link>
      </Nav.Item>
      <Nav.Item as={LinkContainer} exact to="/settings">
        <Nav.Link active={false}>Settings</Nav.Link>
      </Nav.Item>
      <Nav.Item as={LinkContainer} exact to="/about">
        <Nav.Link active={false}>About</Nav.Link>
      </Nav.Item>
    </Nav>
  </div>
);

export default Header;
