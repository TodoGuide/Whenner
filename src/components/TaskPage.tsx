// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright (C) 2019  James Tharpe

import React from "react";
import Task from "./task/Task";
import { useParams } from "react-router-dom";
import useTask from "./hooks/useTask";

const TaskPage: React.FC = () => {
  const { id } = useParams();
  const task = useTask(parseInt(id || "-1", 10));
  return (
    (task && <Task id={`$task-${id}`} task={task} />) || <h1>Task not found</h1>
  );
};

export default TaskPage;
