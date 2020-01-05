// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright (C) 2019  James Tharpe

import React from "react";
import Task from "./task/Task";
import { useParams, Link } from "react-router-dom";
import useTask from "./hooks/useTask";
import { tasksService } from "../services/services";

const TaskPage: React.FC = () => {
  const { id } = useParams();
  const task = useTask(id);
  return (
    (task && (
      <Task
        id={`$task-${id}`}
        task={task}
        onSave={tasksService.upsert}
        onClose={() => (window.location.href = "/tasks")}
      />
    )) || (
      <div>
        <h1>Task not found</h1>
        <Link to="/tasks">View all tasks</Link>
      </div>
    )
  );
};

export default TaskPage;
