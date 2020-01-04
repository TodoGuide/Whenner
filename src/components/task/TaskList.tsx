// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright (C) 2019  James Tharpe

import React from "react";
import { Accordion, Card } from "react-bootstrap";
import { Task as TaskModel } from "../../models/Task";
import Task from "./Task";
import { itemKey } from "../utils";

type TaskListProps = {
  id: string;
  tasks: TaskModel[];
  currentDepth?: number;
  maxDepth?: number;
};

const TaskList: React.FC<TaskListProps> = ({
  id,
  tasks,
  currentDepth = 1,
  maxDepth = 3
}: TaskListProps) => {
  return (
    <Accordion id={id}>
      {tasks.map((task, index) => {
        const key = itemKey(`${id}-list-${currentDepth}`, task, index);
        return (
          <Card key={key}>
            <Card.Header>
              <Accordion.Toggle as={Card.Header} eventKey={key}>
                <strong>{task.title}</strong> {task.description}
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey={key}>
              <Card.Body>
                <Task
                  id={`${key}-task`}
                  task={task}
                  currentDepth={currentDepth}
                  maxDepth={maxDepth}
                />
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        );
      })}
    </Accordion>
  );
};

export default TaskList;
