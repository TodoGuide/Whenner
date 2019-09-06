// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright (C) 2019  James Tharpe

import { WhennerActionType, WhennerAction } from "../common/actions";
import { defaultTasks } from "../../models/TaskEvent";
import { Task } from "../../models/Task";
import { defaultAppointments } from "../../models/AppointmentEvent";
import { Appointment } from "../../models/Appointment";
import { combineReducers } from "redux";
import { Chronotype, defaultChronotype } from "../../models/Chronotype";
import { TaskAction, TasksResultAction } from "../tasks/actions";

function appointments(
  appointments: Appointment[] = defaultAppointments,
  action: /* WhennerAction | */ TaskAction | TasksResultAction
): Appointment[] {
  // TODO: Finish appointments reducer
  return appointments;
}

function chronotype(
  chronotype: Chronotype = defaultChronotype,
  action: WhennerAction
): Chronotype {
  // TODO: Finish the chronotype reducer
  return chronotype;
}

function tasks(
  tasks: Task[] = defaultTasks,
  action: /* WhennerAction | */ TaskAction | TasksResultAction
): Task[] {
  switch (action.type) {
    case WhennerActionType.LoadTasksSuccess:
      return action.tasks;
    case WhennerActionType.InsertTaskSuccess:
      // return quickSchedule(...[...tasks, new Todo(action.todo)]);
      break;
    case WhennerActionType.UpdateTaskSuccess:
      // return tasks.map(todo =>
      //   todo.id === action.todo.id ? action.todo : todo
      // );
      break;
    default:
      break;
  }
  return tasks;
}

export const schedule = combineReducers({
  appointments,
  chronotype,
  tasks
});
