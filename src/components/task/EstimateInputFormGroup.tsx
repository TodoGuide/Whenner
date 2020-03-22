// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright (C) 2019  James Tharpe

import React from "react";
import { Form, InputGroup } from "react-bootstrap";
import { Estimated } from "../../models/time/Estimated";

interface EstimateInputProps {
  estimatedItem: Estimated;
  onModify?: { (estimated: Estimated): void };
}

const EstimateInputFormGroup: React.FC<EstimateInputProps> = ({
  estimatedItem,
  onModify
}: EstimateInputProps) => {
  return (
    <Form.Group>
      <Form.Label>Estimate</Form.Label>
      <InputGroup>
        <Form.Control
          type="number"
          placeholder="How long will it take?"
          defaultValue={estimatedItem.estimate.toString()}
          // onChange={(event: React.FormEvent<HTMLInputElement>) => {
          //   onModify &&
          //     onModify({
          //       ...estimatedItem,
          //       estimate: event.currentTarget.valueAsNumber
          //     });
          // }}
        />
        <InputGroup.Append>
          <InputGroup.Text>Minutes</InputGroup.Text>
        </InputGroup.Append>
      </InputGroup>
    </Form.Group>
  );
};

export default EstimateInputFormGroup;
