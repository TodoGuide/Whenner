// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright (C) 2019  James Tharpe

import React from "react";
import Task from "./Task";
import { useParams, Link, useHistory } from "react-router-dom";
import useTask from "../../hooks/useTask";
import { tasksService } from "../../services/services";

const TaskPage: React.FC = () => {
  const { id } = useParams();
  const [task, setTask] = useTask(id);
  const history = useHistory();

  console.log("TaskPage task", { id, task });

  return (
    (task && (
      <Task
        id={`$task-${id}`}
        task={task}
        onTaskModify={(modifiedTask) => {
          console.log("onTaskModify", modifiedTask);
          setTask(modifiedTask);
        }}
        onTaskSave={(task) => {
          tasksService.upsert(task);
          history.goBack();
        }}
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
