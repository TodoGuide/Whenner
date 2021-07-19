// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright (C) 2019  James Tharpe

import { EventResultAction, EventAction } from "./actions";
import { WhennerActionType } from "../common/actions";
import { defaultTasks, Task } from "../../models/Task";

export function events(
  tasks: Task[] = defaultTasks,
  action: /* WhennerAction | */ EventAction | EventResultAction
): Task[] {
  switch (action.type) {
    case WhennerActionType.LoadEventsSuccess:
      return action.events;
    case WhennerActionType.InsertEventSuccess:
      // return quickSchedule(...[...tasks, new Todo(action.todo)]);
      break;
    case WhennerActionType.UpdateEventSuccess:
      // return tasks.map(todo =>
      //   todo.id === action.todo.id ? action.todo : todo
      // );
      break;
    default:
      break;
  }
  return tasks;
}
