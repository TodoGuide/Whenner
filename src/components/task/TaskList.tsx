// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright (C) 2019  James Tharpe

import React from "react";
import { Accordion, Card } from "react-bootstrap";
import { Task as TaskModel } from "../../models/Task";
import Task from "./Task";
import { itemKey } from "../utils";

type TaskListProps = {
  tasks: TaskModel[];
  hN?: number;
};

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  hN = 2
}: TaskListProps) => {
  return (
    <Accordion>
      {tasks.map((task, index) => {
        const key = itemKey(`task-list-${hN}`, task, index);
        return (
          <Card key={key}>
            <Card.Header>
              <Accordion.Toggle as={Card.Header} eventKey={key}>
                <strong>{task.title}</strong> {task.description}
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey={key}>
              <Card.Body>
                <Task task={task} hN={hN} />
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        );
      })}
    </Accordion>
  );
};

export default TaskList;
