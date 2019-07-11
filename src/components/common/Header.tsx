import React from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";

import logo from "../../logo.svg";
import { Link } from "react-router-dom";
import NavItem from "react-bootstrap/NavItem";

const Header: React.FC = () => {
  return (
    <div>
      <Jumbotron>
        <img
          src={logo}
          className="App-logo"
          style={{ display: "none" }}
          alt="logo"
        />
        <h1 className="App-title">Whenner!</h1>
        <p>Answer "when're you gonna be done" like a Winner!</p>
      </Jumbotron>
      <Nav fill variant="tabs" activeKey={window.location.pathname}>
        <Nav.Item>
          <Nav.Link href="/">Calendar</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/about">About</Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
};

export default Header;