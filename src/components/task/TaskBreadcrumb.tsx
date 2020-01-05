// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright (C) 2019  James Tharpe

import React from "react";
import { Breadcrumb } from "react-bootstrap";
import { Task as TaskModel, supertasksOf } from "../../models/Task";
import { allTestDataTasks } from "../../test/data/tasks";

interface TaskBreadcrumbProps {
  id: string;
  task: TaskModel;
}

const TaskBreadcrumb: React.FC<TaskBreadcrumbProps> = ({
  id,
  task
}: TaskBreadcrumbProps) => {
  return (
    <Breadcrumb id={id}>
      <Breadcrumb.Item title="Set Supertask">
        <span role="img" aria-label="Set Supertask">
          ✨{/* TODO: Implement set for supertask */}
        </span>
      </Breadcrumb.Item>
      {supertasksOf(task, allTestDataTasks)?.map((supertask, index) => (
        <Breadcrumb.Item title={supertask.description} key={`${id}-${index}`}>
          {supertask.title}
        </Breadcrumb.Item>
      ))}
      <Breadcrumb.Item active>{task.title}</Breadcrumb.Item>
    </Breadcrumb>
  );
};

export default TaskBreadcrumb;
