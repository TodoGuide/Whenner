// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright (C) 2019  James Tharpe

import React from "react";
import TaskAccordion from "./task/TaskAccordion";
import useTasks from "./hooks/useTasks";
import { tasksService } from "../services/services";

const TasksPage: React.FC = () => {
  return (
    <TaskAccordion
      tasks={useTasks()}
      onSave={tasksService.upsert}
      id="tasks"
      maxDepth={15}
    />
  );
};

export default TasksPage;
