// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright (C) 2019 James Tharpe

import React from "react";
import { TaskRecord } from "../models/Task";
import TaskList from "./task/TaskList";

const MAX_DEPTH_DEFAULT = 7;

type TaskPageProps = {
  tasks: TaskRecord[];
  taskId: number;
  maxDepth?: number;
};

const TasksPage: React.FC<TaskPageProps> = ({ tasks, taskId, maxDepth }) => {
  console.log("<TasksPage>", { tasks });
  return (
    <TaskList
      tasks={tasks}
      taskId={taskId}
      id="tasks"
      maxDepth={maxDepth || MAX_DEPTH_DEFAULT}
    ></TaskList>
  );
};

export default TasksPage;
