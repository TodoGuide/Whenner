// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright (C) 2019  James Tharpe

import React from "react";
import { Form, InputGroup } from "react-bootstrap";
import { Estimable } from "../models/time/estimation";

interface EstimateInputProps {
  estimatedItem: Estimable;
}

const EstimateInputFormGroup: React.FC<EstimateInputProps> = ({
  estimatedItem,
}: EstimateInputProps) => {
  return (
    <Form.Group>
      <Form.Label>Estimate</Form.Label>
      <InputGroup>
        <Form.Control
          type="text"
          placeholder="How long will it take?"
          value={(estimatedItem.estimate || 0).toString()}
          readOnly
        />
        <InputGroup.Append>
          <InputGroup.Text>Minutes</InputGroup.Text>
        </InputGroup.Append>
      </InputGroup>
    </Form.Group>
  );
};

export default EstimateInputFormGroup;
