// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright (C) 2019  James Tharpe

import React, { useEffect } from "react";
import { Accordion, Card } from "react-bootstrap";
import { Task as TaskModel } from "../../models/Task";
import Task from "./Task";
import { itemKey } from "../utils";
import { tasksService } from "../../services/services";

type TaskListProps = {
  id: string;
  tasks: TaskModel[];
  currentDepth?: number;
  maxDepth?: number;
  onSave?: { (task: TaskModel): void };
};

const TaskList: React.FC<TaskListProps> = ({
  id,
  tasks,
  currentDepth = 1,
  maxDepth = 3,
  onSave
}: TaskListProps) => {
  return (
    <Accordion id={id}>
      {tasks.map((task, index) => {
        const key = itemKey(`${id}-list-${currentDepth}`, task, index);
        const description = (
          <>
            <strong>{task.title}</strong> {task.description}{" "}
          </>
        );
        return (
          <Card key={key}>
            <Card.Header>
              <Accordion.Toggle as={Card.Header} eventKey={key}>
                {task.completed ? <del>{description}</del> : description}
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey={key}>
              <Card.Body>
                <Task
                  id={`${key}-task`}
                  task={task}
                  currentDepth={currentDepth}
                  maxDepth={maxDepth}
                  onSave={onSave}
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
