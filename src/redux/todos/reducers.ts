import { TasksResultAction, TaskAction } from "./actions";
import { defaultTasks } from "../../services/TasksService";
import { WhennerActionType } from "../common/actions";
import { ITask } from "../../models/Task";

export function tasks(
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
