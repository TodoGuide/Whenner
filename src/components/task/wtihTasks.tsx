// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright (C) 2019  James Tharpe

import React from "react";
import useTasksState from "../../hooks/useTasksState";
import { Task } from "../../models/Task";
import { Subtract } from "utility-types";
import { tasksService } from "../../services/services";

export interface TasksElementAutoProps {
  onTaskSave?: { (task: Task): void };
  onTaskModify?: { (modifiedTask: Task): void };
}

export interface TasksElementProps extends TasksElementAutoProps {
  tasks?: Task[];
}

/**
 *
 * @param Component is the component to decorate with task-related management
 */
const withTasks = <P extends TasksElementProps>(
  Component: React.ComponentType<P>
): React.FC<Subtract<P, TasksElementAutoProps>> => {
  return ({ tasks, ...props }: TasksElementProps) => {
    const handleTaskModify = (modifiedTask: Task) => {
      setTasks(
        tasksState?.map((task) =>
          task.id === modifiedTask.id ? modifiedTask : task
        )
      );
    };

    const autoProps = {
      onTaskSave: tasksService.upsert,
      onTaskModify: handleTaskModify,
    };

    if (tasks) {
      return <Component tasks={tasks} {...autoProps} {...(props as P)} />;
    }

    const [tasksState, setTasks] = useTasksState();
    return <Component tasks={tasksState} {...autoProps} {...(props as P)} />;
  };
};

export default withTasks;
