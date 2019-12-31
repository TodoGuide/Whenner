// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright (C) 2019  James Tharpe

import React from "react";
import { Breadcrumb } from "react-bootstrap";
import { Task as TaskModel, parentsOf } from "../../models/Task";
import { allTestDataTasks } from "../../test/data";
import { itemKey } from "../utils";

interface TaskBreadcrumbProps {
  task: TaskModel;
}

const TaskBreadcrumb: React.FC<TaskBreadcrumbProps> = ({
  task
}: TaskBreadcrumbProps) => {
  return (
    <Breadcrumb>
      <Breadcrumb.Item title="Set Parent">
        <span role="img" aria-label="Set Parent">
          ✨
        </span>
      </Breadcrumb.Item>
      {parentsOf(task, allTestDataTasks)?.map((parent, index) => (
        <Breadcrumb.Item
          title={parent.description}
          key={itemKey("task-breadcrumb", parent, index)}
        >
          {parent.title}
        </Breadcrumb.Item>
      ))}
      <Breadcrumb.Item active>{task.title}</Breadcrumb.Item>
    </Breadcrumb>
  );
};

export default TaskBreadcrumb;
