import { TodosResultAction } from "./actions";
import { ITodo } from "../../models/Todo";
import { defaultTodos } from "../../services/TodosService";
import { WhennerActionType } from "..";

export function todos(
  todos: ITodo[] = defaultTodos,
  action: /* WhennerAction | TodoAction | */ TodosResultAction
): ITodo[] {
  switch (action.type) {
    case WhennerActionType.LoadTodosSuccess:
      return action.todos;
    // No need to calculate state because todos will be reloaded by thunk
    case WhennerActionType.InsertTodoSuccess:
    case WhennerActionType.UpdateTodoSuccess:
    default:
      break;
  }
  return todos;
}
