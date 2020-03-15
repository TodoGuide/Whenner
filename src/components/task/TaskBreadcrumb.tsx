// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright (C) 2019  James Tharpe

import React from "react";
import { Breadcrumb } from "react-bootstrap";
import { Task as TaskModel } from "../../models/Task";
import useTaskSupertasks from "../hooks/useTaskSupertasks";
import { LinkContainer } from "react-router-bootstrap";
import { useLocation } from "react-router-dom";

interface TaskBreadcrumbProps {
  id: string;
  task: TaskModel;
  onSetSupertaskClick?: { (task: TaskModel): void };
}

const TaskBreadcrumb: React.FC<TaskBreadcrumbProps> = ({
  id,
  task,
  onSetSupertaskClick
}: TaskBreadcrumbProps) => {
  const supertasks = useTaskSupertasks(task.id);
  const location = useLocation();

  return (
    <Breadcrumb id={id}>
      {supertasks?.map((supertask, index) => (
        <LinkContainer
          to={{
            pathname: `/tasks/${supertask.id}`,
            state: { background: location }
          }}
          key={`${id}-${index}`}
        >
          <Breadcrumb.Item title={supertask.description}>
            {supertask.title}
          </Breadcrumb.Item>
        </LinkContainer>
      ))}
      {onSetSupertaskClick && (
        <Breadcrumb.Item
          title="Set Supertask"
          onClick={() => onSetSupertaskClick(task)}
        >
          <span role="img" aria-label="Set Supertask">
            ✨
          </span>
        </Breadcrumb.Item>
      )}
      <Breadcrumb.Item active>{task.title}</Breadcrumb.Item>
    </Breadcrumb>
  );
};

export default TaskBreadcrumb;
