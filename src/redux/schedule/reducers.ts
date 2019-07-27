import { WhennerActionType } from "../common/actions";
import { ITask, defaultTasks } from "../../models/Task";
import { IAppointment, defaultAppointments } from "../../models/Appointment";
import { combineReducers } from "redux";
import { TasksResultAction, TaskAction } from "../todos/actions";

 function appointments(
  appointments: IAppointment[] = defaultAppointments,
  action: /* WhennerAction | */ TaskAction | TasksResultAction
): IAppointment[] {
  // TODO: Finish appointments reducer
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
  tasks,
});