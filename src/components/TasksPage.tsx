// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright (C) 2019 James Tharpe

import React from "react";
import { TaskRecord } from "../models/Task";
import TaskList from "./task/TaskList";

const MAX_DEPTH_DEFAULT = 7;

type TaskPageProps = {
  tasks: TaskRecord[];
  maxDepth?: number;
};

const TasksPage: React.FC<TaskPageProps> = ({ tasks, maxDepth }) => {
  console.log("<TasksPage>", { tasks });
  return (
    <TaskList
      tasks={tasks}
      id="tasks"
      maxDepth={maxDepth || MAX_DEPTH_DEFAULT}
    ></TaskList>
  );
};

export default TasksPage;
