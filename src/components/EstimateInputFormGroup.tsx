// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright (C) 2019  James Tharpe

import React from "react";
import { Form, InputGroup } from "react-bootstrap";
import { Estimated } from "../models/time/Estimated";

interface EstimateInputProps {
  estimatedItem: Estimated;
}

const EstimateInputFormGroup: React.FC<EstimateInputProps> = ({
  estimatedItem
}: EstimateInputProps) => {
  return (
    <Form.Group>
      <Form.Label>Estimate</Form.Label>
      <InputGroup>
        <Form.Control
          type="text"
          placeholder="How long will it take?"
          value={estimatedItem.estimate.toString()}
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
