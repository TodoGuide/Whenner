import { TodosResultAction, TodoAction } from "../todos/actions";
import { WhennerActionType } from "../common/actions";
import { ITask, defaultTasks } from "../../models/Task";
import { IAppointment, defaultAppointments } from "../../models/Appointment";
import { combineReducers } from "redux";

function appointments(
  appointments: IAppointment[] = defaultAppointments,
  action: /* WhennerAction | */ TodoAction | TodosResultAction
): IAppointment[] {
  switch (action.type) {
    case WhennerActionType.LoadAppointmentsSuccess:
      return action.todo;
    case WhennerActionType.InsertAppointmentSuccess:
      // return quickSchedule(...[...tasks, new Todo(action.todo)]);
    case WhennerActionType.UpdateAppointmentSuccess:
      // return tasks.map(todo =>
      //   todo.id === action.todo.id ? action.todo : todo
      // );
    default:
      break;
  }
  return appointments;
}

function tasks(
  tasks: ITask[] = defaultTasks,
  action: /* WhennerAction | */ TodoAction | TodosResultAction
): ITask[] {
  switch (action.type) {
    case WhennerActionType.LoadTasksSuccess:
      return action.todo;
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