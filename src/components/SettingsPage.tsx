// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright (C) 2019  James Tharpe

import React from "react";
import { Form } from "react-bootstrap";

const SettingsPage: React.FC = () => {
  return (
    <Form>
      <h2>Settings</h2>
      <Form.Group>
        <h3>Your Schedule</h3>
        <Form.Label>Start of Day</Form.Label>
        <Form.Control
          id="settings-chronotype-start"
          type="text"
          placeholder="e.g. 8:00AM"
          // value={}
          // onChange={}
        />
        <Form.Label>End of Day</Form.Label>
        <Form.Control
          id="settings-chronotype-end"
          type="text"
          placeholder="e.g. 8:00PM"
          // value={}
          // onChange={}
        />
      </Form.Group>
    </Form>
  );
};

export default SettingsPage;
