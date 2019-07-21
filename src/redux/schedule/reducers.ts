import { WhennerActionType } from "../common/actions";
import { ITask, defaultTasks } from "../../models/Task";
import { IAppointment, defaultAppointments } from "../../models/Appointment";
import { combineReducers } from "redux";
import { TasksResultAction, TaskAction } from "../todos/actions";

function appointments(
  appointments: IAppointment[] = defaultAppointments,
  action: /* WhennerAction | */ TaskAction | TasksResultAction
): IAppointment[] {
  // switch (action.type) {
  //   case WhennerActionType.LoadAppointmentsSuccess:
  //     return action.todo;
  //   case WhennerActionType.InsertAppointmentSuccess:
  //     // return quickSchedule(...[...tasks, new Todo(action.todo)]);
  //   case WhennerActionType.UpdateAppointmentSuccess:
  //     // return tasks.map(todo =>
  //     //   todo.id === action.todo.id ? action.todo : todo
  //     // );
  //   default:
  //     break;
  // }
  return appointments;
}

function tasks(
  tasks: ITask[] = defaultTasks,
  action: /* WhennerAction | */ TaskAction | TasksResultAction
): ITask[] {
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

export const schedule = combineReducers({
  appointments,
  tasks,
});