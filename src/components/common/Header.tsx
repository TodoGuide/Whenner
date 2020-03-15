// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright (C) 2019  James Tharpe

import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import Nav from "react-bootstrap/Nav";
import { Navbar, Button, Form, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";

const Header: React.FC = () => (
  <div>
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="/">Whenner</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Item as={LinkContainer} to="/tasks">
            <Nav.Link active={false}>Tasks</Nav.Link>
          </Nav.Item>
          <Nav.Item as={LinkContainer} exact to="/calendar">
            <Nav.Link active={false}>Calendar</Nav.Link>
          </Nav.Item>
        </Nav>
        <Nav>
          <Nav.Item as={LinkContainer} exact to="/settings">
            <Nav.Link active={false}>Settings</Nav.Link>
          </Nav.Item>
          <Nav.Item as={LinkContainer} exact to="/about">
            <Nav.Link active={false}>About</Nav.Link>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    <Navbar>
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto justify-content-center">
          <Nav.Item>
            <Link to="/tasks/new">
              <Button variant="primary">New Task</Button>
            </Link>
          </Nav.Item>
        </Nav>
        <Nav className="mr-auto justify-content-center">
          <Nav.Item>
            <span className="mr-3 font-weight-bold">Filter: </span>
            <Form.Check
              type="checkbox"
              inline
              label="Incomplete"
              defaultChecked
            />
            <Form.Check type="checkbox" inline label="Complete" />
            <Form.Check type="checkbox" inline label="Canceled" />
          </Nav.Item>
        </Nav>
        <Nav>
          <Nav.Item>
            <Form inline>
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  </div>
);

export default Header;
