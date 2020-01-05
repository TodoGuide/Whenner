// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright (C) 2019  James Tharpe

import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import EstimateInputFormGroup from "../EstimateInputFormGroup";
import { Task as TaskModel } from "../../models/Task";
import TaskStatusFormGroup from "./TaskStatusFormGroup";
import TaskBreadcrumb from "./TaskBreadcrumb";
import { itemKey } from "../utils";
import TaskRelationshipTabs from "./TaskRelationshipTabs";

interface TaskProps {
  id: string;
  task: TaskModel;
  currentDepth?: number;
  maxDepth?: number;
  onSave?: { (task: TaskModel): void };
}

const Task: React.FC<TaskProps> = ({
  id,
  task: taskProp,
  currentDepth = 1,
  maxDepth = 3,
  onSave
}: TaskProps) => {
  const [task, setTask] = useState(taskProp);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSave && onSave(task);
  };

  return (
    <div id={id}>
      <Form onSubmit={handleFormSubmit}>
        <TaskBreadcrumb task={task} />
        <Form.Group id={itemKey(`${id}-title-group`, task, currentDepth)}>
          <Form.Control
            id={itemKey(`${id}-title`, task, currentDepth)}
            type="text"
            placeholder="What do you want to get done?"
            value={task.title}
            onChange={(event: React.FormEvent<HTMLInputElement>) =>
              setTask({ ...task, title: event.currentTarget.value })
            }
          />
        </Form.Group>
        <Form.Group id={itemKey(`${id}-description-group`, task, currentDepth)}>
          <Form.Control
            id={itemKey(`${id}-description`, task, currentDepth)}
            as="textarea"
            rows="3"
            value={task.description}
            readOnly
          />
        </Form.Group>
        <EstimateInputFormGroup estimatedItem={task} />
        <TaskStatusFormGroup
          task={task}
          id={itemKey(`${id}-state`, task, currentDepth)}
        />
        <Form.Group controlId="actions" className="text-right">
          <Button variant="secondary" className="m-2">
            Close
          </Button>
          <Button type="submit" variant="primary" className="m-2">
            Save Changes
          </Button>
        </Form.Group>
      </Form>
      <TaskRelationshipTabs
        id={itemKey(`${id}-relationships`, task, currentDepth)}
        task={task}
        currentDepth={currentDepth}
        maxDepth={maxDepth}
      />
      <hr />
    </div>
  );
};

export default Task;
