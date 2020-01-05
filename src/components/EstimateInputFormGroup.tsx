// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright (C) 2019  James Tharpe

import React, { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { Estimated } from "../models/time/Estimated";

interface EstimateInputProps {
  estimatedItem: Estimated;
}

const EstimateInputFormGroup: React.FC<EstimateInputProps> = ({
  estimatedItem
}: EstimateInputProps) => {
  const [estimate, setEstimate] = useState(estimatedItem.estimate);

  return (
    <Form.Group>
      <Form.Label>Estimate</Form.Label>
      <InputGroup>
        <Form.Control
          type="number"
          placeholder="How long will it take?"
          value={estimate.toString()}
          onChange={(event: React.FormEvent<HTMLInputElement>) =>
            setEstimate(event.currentTarget.valueAsNumber)
          }
        />
        <InputGroup.Append>
          <InputGroup.Text>Minutes</InputGroup.Text>
        </InputGroup.Append>
      </InputGroup>
    </Form.Group>
  );
};

export default EstimateInputFormGroup;
