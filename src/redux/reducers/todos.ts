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
      result = todos.map(todo => new Todo(todo));
      result.push(new Todo(action.todo));
      break;
    case WhennerActionType.UpdateTodoSuccess:
      console.log("UpdateTodoSuccess", action.todo);
      result = todos.map(todo =>
        todo.id === action.todo.id ? new Todo(action.todo) : todo
      );
      break;
    case WhennerActionType.LoadTodosSuccess:
      result = action.todos;
      break;
    default:
      break;
  }
  return result;
}
