// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright (C) 2019  James Tharpe

import React from "react";
import { Form } from "react-bootstrap";
import { Task as TaskModel } from "../../models/Task";
import { itemKey } from "../utils";

interface TaskStatusFormGroupProps {
  id: string;
  task: TaskModel;
}

const TaskStatusFormGroup: React.FC<TaskStatusFormGroupProps> = ({
  id,
  task
}: TaskStatusFormGroupProps) => {
  return (
    <Form.Group id={id}>
      <Form.Check
        id={itemKey(id + "-incomplete", task)}
        checked
        name="status"
        label="Incomplete"
        type="radio"
        readOnly
      />
      <Form.Check
        id={itemKey(id + "-complete", task)}
        name="status"
        label="Complete [yyyy-MM-dd]"
        type="radio"
        readOnly
      />
      <Form.Check
        id={itemKey(id + "-canceled", task)}
        name="status"
        label="Canceled [yyyy-MM-dd]"
        type="radio"
        readOnly
      />
    </Form.Group>
  );
};

export default TaskStatusFormGroup;
