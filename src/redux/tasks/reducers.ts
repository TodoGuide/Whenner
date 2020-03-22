// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright (C) 2019  James Tharpe

import { TasksResultAction, TaskAction } from "./actions";
import { WhennerActionType } from "../common/actions";
import { Task } from "../../models/Task";

export function tasks(
  tasks: Task[] = [],
  action: /* WhennerAction | */ TaskAction | TasksResultAction
): Task[] {
  switch (action.type) {
    case WhennerActionType.LoadTasksSuccess:
      return action.tasks;
    case WhennerActionType.InsertTaskSuccess:
    // return quickSchedule(...[...tasks, new Todo(action.todo)]);
    case WhennerActionType.UpdateTaskSuccess:
    // return tasks.map(todo =>
    //   todo.id === action.todo.id ? action.todo : todo
    // );
    default:
      break;
  }
  return tasks;
}
