import { WhennerAction } from "../actions/WhennerAction";
import { WhennerActionType } from "../actions/WhennerActionType";
import { TodoAction } from "../actions/TodoAction";
import { TodosAction } from "../actions/TodosAction";
import { ITodo, Todo } from "../../models/Todo";
import { defaultTodos } from "../../services/TodosService";

export function todos(
  todos: ITodo[] = defaultTodos,
  action: WhennerAction | TodoAction | TodosAction
) {
  let result = todos;
  switch (action.type) {
    case WhennerActionType.InsertTodoSuccess:
    case WhennerActionType.UpdateTodoSuccess:
      // No need to calculate state because todos will be reloaded by thunk
      break;
    case WhennerActionType.LoadTodosSuccess:
      result = action.todos;
      break;
    default:
      break;
  }
  return result;
}
