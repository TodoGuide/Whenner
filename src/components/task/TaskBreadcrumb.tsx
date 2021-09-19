// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright (C) 2019 James Tharpe

import React from "react";
import { Breadcrumb } from "react-bootstrap";
import Task, { supertasksOf, tasksIn } from "../../task";

interface TaskBreadcrumbProps {
  taskId: number;
  tasks: Array<Task>;
}

const TaskBreadcrumb: React.FC<TaskBreadcrumbProps> = ({
  taskId,
  tasks,
}: TaskBreadcrumbProps) => {
  const task = tasks.find((t) => t.id === taskId);
  console.log("<TaskBreadcrumb>", {
    taskId,
    tasks,
  });
  if (!task) return <>Task with ID ${taskId} not found in tasks</>; // throw new Error(`Task with ID ${taskId} not found in tasks`);
  return (
    <Breadcrumb>
      <Breadcrumb.Item title="Set Supertask">
        <span role="img" aria-label="Set Supertask">
          ✨{/* TODO: Implement set for supertask */}
        </span>
      </Breadcrumb.Item>
      {supertasksOf(task, tasksIn(tasks))?.map((supertask, index) => (
        <Breadcrumb.Item
          title={supertask.description}
          key={`task-breadcrumb-${supertask.id}-${index}`}
        >
          {supertask.title}
        </Breadcrumb.Item>
      ))}
      <Breadcrumb.Item active>{task.title}</Breadcrumb.Item>
    </Breadcrumb>
  );
};

export default TaskBreadcrumb;
