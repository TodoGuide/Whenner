import { TodosResultAction, TodoAction } from "./actions";
import { ITodo, Todo } from "../../models/Todo";
import { defaultTodos } from "../../services/TodosService";
import { WhennerActionType } from "../common/actions";
import { schedule, quickSchedule } from "../../models/schedule";

export function todos(
  todos: ITodo[] = defaultTodos,
  action: /* WhennerAction | */ TodoAction | TodosResultAction
): ITodo[] {
  switch (action.type) {
    case WhennerActionType.LoadTodosSuccess:
      return action.todos;
    case WhennerActionType.InsertTodoSuccess:
      // return quickSchedule(...[...todos, new Todo(action.todo)]);
    case WhennerActionType.UpdateTodoSuccess:
      // return todos.map(todo =>
      //   todo.id === action.todo.id ? action.todo : todo
      // );
    default:
      break;
  }
  return todos;
}
