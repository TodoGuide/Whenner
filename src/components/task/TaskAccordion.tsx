// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright (C) 2019  James Tharpe

import React, { useState } from "react";
import { Accordion } from "react-bootstrap";
import { Task as TaskModel } from "../../models/Task";
import { itemKey } from "../utils";
import TaskAccordionItem from "./TaskAccordionItem";

type TaskListProps = {
  id: string;
  tasks: TaskModel[];
  currentDepth?: number;
  maxDepth?: number;
  onSave?: { (task: TaskModel): void };
};

const TaskAccordion: React.FC<TaskListProps> = ({
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
        return (
          <TaskAccordionItem
            id={key}
            key={key}
            task={task}
            onToggle={toggleExpanded}
            onSave={onSave}
          />
        );
      })}
    </Accordion>
  );
};

export default TaskAccordion;
