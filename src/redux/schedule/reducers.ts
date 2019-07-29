import { WhennerActionType, WhennerAction } from "../common/actions";
import { defaultTasks } from "../../models/TaskEvent";
import { Task } from "../../models/Task";
import { defaultAppointments } from "../../models/AppointmentEvent";
import { Appointment } from "../../models/Appointment";
import { combineReducers } from "redux";
import { TasksResultAction, TaskAction } from "../todos/actions";
import { Chronotype, defaultChronotype } from "../../models/Chronotype";

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
