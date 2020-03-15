// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright (C) 2019  James Tharpe

import React, { useState } from "react";
import { Accordion, Card } from "react-bootstrap";
import Task, { TaskProps } from "./Task";
import { Task as TaskModel } from "../../models/Task";

interface TaskAccordionItemProps extends TaskProps {
  onToggle?: { (id: string): void };
}

const TaskAccordionItem: React.FC<TaskAccordionItemProps> = ({
  id,
  task: taskProp,
  currentDepth = 1,
  maxDepth = 3,
  onSave,
  onToggle,
  onModify
}: TaskAccordionItemProps) => {
  const [task, setTask] = useState(taskProp);

  const handleModify = (modifiedTask: TaskModel) => {
    setTask(modifiedTask);
    onModify && onModify(modifiedTask);
  };

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
            maxDepth={maxDepth}
            onSave={onSave}
            onClose={() => onToggle && onToggle(id)}
            onModify={handleModify}
          />
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  );
};

export default TaskAccordionItem;
