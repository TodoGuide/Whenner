// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright (C) 2019  James Tharpe

import React from "react";
import TaskList from "./task/TaskList";
import useTasks from "./hooks/useTasks";
import { tasksService } from "../services/services";

const TasksPage: React.FC = () => {
  return (
    <TaskList
      tasks={useTasks()}
      onSave={tasksService.upsert}
      id="tasks"
      maxDepth={15}
    ></TaskList>
  );
};

export default TasksPage;
