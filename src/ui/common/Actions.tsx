// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright © 2021  James Tharpe

import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { Sender, State } from "xstate";
import { WhennerContext, WhennerEvent } from "../../whenner.state";

type ActionsPageProps = {
  state: State<WhennerContext, WhennerEvent>;
  send: Sender<WhennerEvent>;
};

const Actions: React.FC<ActionsPageProps> = ({ state, send }) => {
  return (
    <Row>
      <Col>
        {state.nextEvents.includes("NEW_TASK") && (
          <Button variant="primary" onClick={() => send("NEW_TASK")}>
            New Task
          </Button>
        )}
      </Col>
    </Row>
  );
};

export default Actions;
