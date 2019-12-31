// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright (C) 2019  James Tharpe

import React from "react";
import TaskList from "./task/TaskList";
import { allTestDataTasks } from "../test/data";

const TasksPage: React.FC = () => (
  <TaskList tasks={allTestDataTasks}></TaskList>
);

export default TasksPage;
