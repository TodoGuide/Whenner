// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright (C) 2019  James Tharpe

import React from "react";
import TaskAccordion from "./task/TaskAccordion";

const TasksPage: React.FC = () => {
  return <TaskAccordion id="tasks" maxDepth={5} />;
};

export default TasksPage;
