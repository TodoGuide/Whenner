// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright (C) 2019  James Tharpe

import React from "react";
import { Nav } from "react-bootstrap";

const Navigator: React.FC = () => (
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
);

export default Navigator;
