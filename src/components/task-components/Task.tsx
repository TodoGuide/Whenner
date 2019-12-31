// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright (C) 2019  James Tharpe

import React from "react";
import { Form, Button, Breadcrumb } from "react-bootstrap";
import EstimateInput from "../EstimateInput";
import { Task as TaskModel, subtasksOf } from "../../models/Task";
import { allTestDataTasks } from "../../test/data";
import TaskStatusFormGroup from "./TaskStatusFormGroup";
import TaskList from "./TaskList";
import TaskBreadcrumb from "./TaskBreadcrumb";

interface TaskProps {
  task: TaskModel;
  hN?: number;
}

const Task: React.FC<TaskProps> = ({ task, hN = 3 }: TaskProps) => {
  const subtasks = subtasksOf(task, allTestDataTasks);
  return (
    <div>
      <Form>
        <TaskBreadcrumb task={task} />
        <Form.Group controlId="title">
          <Form.Control
            type="text"
            placeholder="What do you want to get done?"
            value={task.title}
            readOnly
          />
        </Form.Group>
        <Form.Group controlId="description">
          <Form.Control
            as="textarea"
            rows="3"
            value={task.description}
            readOnly
          />
        </Form.Group>
        <Form.Group controlId="estimate">
          <EstimateInput estimatedItem={task} />
        </Form.Group>
        <TaskStatusFormGroup task={task} controlId="state" />
        <Form.Group controlId="actions" className="text-right">
          <Button variant="secondary" className="m-2">
            Close
          </Button>
          <Button variant="primary" className="m-2">
            Save Changes
          </Button>
        </Form.Group>
      </Form>
      {subtasks && (
        <div>
          {React.createElement("h" + hN, null, "Subtasks")}
          <small className="text-muted">
            These tasks must be completed before the supertask can be marked
            complete
          </small>
          <TaskList tasks={subtasks} hN={hN + 1} />
        </div>
      )}
    </div>
  );
};

export default Task;
