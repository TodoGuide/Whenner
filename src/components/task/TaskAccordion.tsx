// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright (C) 2019  James Tharpe

import React, { useState } from "react";
import { Accordion } from "react-bootstrap";
import { itemKey } from "../utils";
import TaskAccordionItem from "./TaskAccordionItem";
import withTasks, { TasksElementProps } from "./wtihTasks";

interface TaskListProps extends TasksElementProps {
  id: string;
  currentDepth?: number;
  maxDepth?: number;
}

const TaskAccordion: React.FC<TaskListProps> = ({
  id,
  currentDepth = 1,
  maxDepth = 3,
  tasks,
  onTaskSave,
  onTaskModify,
}: TaskListProps) => {
  const [expanded, setExpanded] = useState<string | undefined>(undefined);
  const toggleExpanded = (key?: string) =>
    key === expanded ? setExpanded(key) : setExpanded(undefined);

  return (
    <Accordion id={id} activeKey={expanded}>
      {tasks?.map((task, index) => {
        const key = itemKey(`${id}-list-${currentDepth}`, task, index);
        return (
          <TaskAccordionItem
            id={key}
            {...{
              key,
              task,
              toggleExpanded,
              onTaskSave,
              onTaskModify,
              currentDepth: currentDepth,
              maxDepth,
            }}
          />
        );
      })}
    </Accordion>
  );
};

export default withTasks(TaskAccordion);
