// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright (C) 2019  James Tharpe

import React, { useState } from "react";
import { Accordion, Card } from "react-bootstrap";
import { Task as TaskModel } from "../../models/Task";
import Task from "./Task";
import { itemKey } from "../utils";

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
  const [expanded, setExpanded] = useState<string | undefined>(undefined);
  const toggleExpanded = (key?: string) =>
    key === expanded ? setExpanded(key) : setExpanded(undefined);

  return (
    <Accordion id={id} activeKey={expanded}>
      {tasks.map((task, index) => {
        const key = itemKey(`${id}-list-${currentDepth}`, task, index);
        const description = (
          <>
            <strong>{task.title}</strong> {task.description}{" "}
          </>
        );
        return (
          <Card key={key}>
            <Card.Header onClick={() => toggleExpanded(key)}>
              <Accordion.Toggle as={Card.Header} eventKey={key}>
                {task.completed || task.canceled ? (
                  <del>{description}</del>
                ) : (
                  description
                )}
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
                  onClose={() => {
                    toggleExpanded();
                  }}
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
