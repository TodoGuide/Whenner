// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright (C) 2019  James Tharpe

import React from "react";
import { Form } from "react-bootstrap";
import { Task as TaskModel } from "../../models/Task";

interface TaskStatusFormGroupProps {
  controlId: string;
  task: TaskModel;
}

const TaskStatusFormGroup: React.FC<TaskStatusFormGroupProps> = ({
  controlId,
  task
}: TaskStatusFormGroupProps) => {
  return (
    <Form.Group controlId={controlId}>
      <Form.Check
        checked
        name="status"
        label="Incomplete"
        type="radio"
        readOnly
      />
      <Form.Check
        name="status"
        label="Complete [yyyy-MM-dd]"
        type="radio"
        readOnly
      />
      <Form.Check
        name="status"
        label="Canceled [yyyy-MM-dd]"
        type="radio"
        readOnly
      />
    </Form.Group>
  );
};

export default TaskStatusFormGroup;
