// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright © 2021  James Tharpe

import React from "react";
import { Row, Col, Button } from "react-bootstrap";

type ActionsPageProps = {
  onIncludeTask: { (): void };
};

const Actions: React.FC<ActionsPageProps> = ({ onIncludeTask }) => {
  return (
    <Row>
      <Col>
        <Button variant="primary" onClick={() => onIncludeTask()}>
          New Task
        </Button>{" "}
      </Col>
    </Row>
  );
};

export default Actions;
