// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright (C) 2019  James Tharpe

import React from "react";
import { Accordion, Card } from "react-bootstrap";
import Task, { TaskProps } from "./Task";

interface TaskAccordionItemProps extends TaskProps {
  onToggle?: { (id: string): void };
}

const TaskAccordionItem: React.FC<TaskAccordionItemProps> = ({
  id,
  task,
  currentDepth = 1,
  maxDepth = 3,
  onTaskSave,
  onToggle,
  onTaskModify
}: TaskAccordionItemProps) => {
  const description = (
    <span>
      {(task.completed && "✔") || "⬜"}
      <strong>{task.title}</strong> {task.description}
    </span>
  );

  return (
    <Card key={id}>
      <Card.Header onClick={() => onToggle && onToggle(id)}>
        <Accordion.Toggle as={Card.Header} eventKey={id}>
          {task.canceled ? <del>{description}</del> : description}
        </Accordion.Toggle>
      </Card.Header>
      <Accordion.Collapse eventKey={id}>
        <Card.Body>
          <Task
            id={`${id}-task`}
            task={task}
            currentDepth={currentDepth}
            {...{ maxDepth, onTaskSave, onTaskModify }}
            onClose={() => onToggle && onToggle(id)}
          />
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  );
};

export default TaskAccordionItem;
