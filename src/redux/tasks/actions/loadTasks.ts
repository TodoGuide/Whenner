// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright (C) 2019  James Tharpe

import { TasksResultAction, TasksResultActionThunk } from ".";
import { Dispatch } from "redux";
import { tasksService } from "../../../services/services";
import { WhennerActionType } from "../../common/actions";
import { Task } from "../../../models/Task";

function loadTasksSuccess(tasks: Task[]): TasksResultAction {
  return {
    type: WhennerActionType.LoadTasksSuccess,
    tasks: tasks
  };
}

/**
 * A thunk to load todo items
 */
export const loadTasks: TasksResultActionThunk = () => {
  return function(dispatch: Dispatch) {
    return tasksService
      .read()
      .then(tasks => dispatch(loadTasksSuccess(tasks)))
      .catch(e => {
        console.log("loadTasks error", e);
        throw e;
      });
  };
};
