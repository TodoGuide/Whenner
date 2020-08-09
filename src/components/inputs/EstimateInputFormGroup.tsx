// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright (C) 2019  James Tharpe

import React from "react";
import { Form, InputGroup } from "react-bootstrap";
import { Estimated } from "../../models/time/Estimated";

interface EstimateInputProps {
  label?: string;
  placeholder?: string;
  estimatedItem: Estimated;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const EstimateInputFormGroup: React.FC<EstimateInputProps> = ({
  label = "Estimate",
  placeholder = "How long will it take?",
  estimatedItem,
  onChange,
}: EstimateInputProps) => {
  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      <InputGroup>
        <Form.Control
          type="number"
          placeholder={placeholder}
          defaultValue={estimatedItem.estimate.toString()}
          onChange={onChange}
        />
        <InputGroup.Append>
          <InputGroup.Text>Minutes</InputGroup.Text>
        </InputGroup.Append>
      </InputGroup>
    </Form.Group>
  );
};

export default EstimateInputFormGroup;
