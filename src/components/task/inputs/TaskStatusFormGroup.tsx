// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright (C) 2019  James Tharpe

import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Task as TaskModel } from "../../../models/Task";
import { TaskEvent } from "../../../models/TaskEvent";

interface TaskStatusFormGroupProps {
  id: string;
  task: TaskModel;
  onModify?: { (task: TaskModel): void };
}

const TaskStatusFormGroup: React.FC<TaskStatusFormGroupProps> = ({
  id,
  task: taskProp,
  onModify,
}: TaskStatusFormGroupProps) => {
  console.log("TaskStatusFormGroup taskProp", taskProp);
  const [task, setTask] = useState(taskProp);

  const handleChange = ({
    currentTarget: { id },
  }: React.ChangeEvent<HTMLInputElement>) => {
    const status = id.substring(id.lastIndexOf("-") + 1);
    let changedTask = new TaskEvent(task);
    switch (status) {
      case "incomplete":
        changedTask.completed = changedTask.canceled = undefined;
        break;
      case "complete":
        changedTask.completed = task.completed || new Date();
        changedTask.canceled = undefined;
        break;
      case "canceled":
        changedTask.completed = undefined;
        changedTask.canceled = task.canceled || new Date();
        break;
      default:
        throw Error("Unknown status: " + status);
    }
    setTask(changedTask);
    onModify && onModify(changedTask);
  };

  return (
    <Form.Group id={id}>
      <Form.Check
        id={`${id}-incomplete`}
        name="status"
        checked={!task.completed && !task.canceled}
        label="Incomplete"
        type="radio"
        onChange={handleChange}
      />
      <Form.Check
        id={`${id}-complete`}
        name="status"
        checked={!!task.completed}
        label={`Completed ${
          (task.completed && new Date(task.completed).toLocaleString()) ?? ""
        }`}
        type="radio"
        onChange={handleChange}
      />
      <Form.Check
        id={`${id}-canceled`}
        name="status"
        checked={!!task.canceled}
        label={`Canceled ${
          (task.canceled && new Date(task.canceled).toLocaleString()) ?? ""
        }`}
        type="radio"
        onChange={handleChange}
      />
    </Form.Group>
  );
};

export default TaskStatusFormGroup;
