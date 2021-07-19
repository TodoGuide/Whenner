// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright (C) 2019  James Tharpe

import React from "react";
import TaskList from "./task/TaskList";
import { allTestDataEvents } from "../test/data";
import { tasksIn } from "../models/Task";

const TasksPage: React.FC = () => (
  <TaskList
    tasks={tasksIn(allTestDataEvents)}
    id="tasks"
    maxDepth={15}
  ></TaskList>
);

export default TasksPage;
