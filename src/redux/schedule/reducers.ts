// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright (C) 2019  James Tharpe

import { WhennerActionType, WhennerAction } from "../common/actions";
import { combineReducers } from "redux";
import { Chronotype, defaultChronotype } from "../../models/Chronotype";
import { EventAction, EventResultAction } from "../tasks/actions";
import { Event } from "../../models/Event";
import { defaultTasks } from "../../models/Task";
import { defaultAppointments } from "../../models/Appointment";

function chronotype(
  chronotype: Chronotype = defaultChronotype,
  action: WhennerAction
): Chronotype {
  // TODO: Finish the chronotype reducer
  return chronotype;
}

function events(
  events: Event[] = [...defaultTasks, ...defaultAppointments],
  action: /* WhennerAction | */ EventAction | EventResultAction
): Event[] {
  switch (action.type) {
    case WhennerActionType.LoadTasksSuccess:
      return action.events;
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
  return events;
}

export const schedule = combineReducers({
  chronotype,
  events,
});
