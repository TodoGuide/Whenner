import { WhennerAction } from "../actions/WhennerAction";
import { WhennerActionType } from "../actions/WhennerActionType";
import { schedule } from "../../models/schedule";
import { TodoAction } from "../actions/TodoAction";
import { TodosAction } from "../actions/TodosAction";
import { Chronotype } from "../../models/Chronotype";
import { ITodo } from "../../models/Todo";

export function todos(
  todos: ITodo[],
  chronotype: Chronotype,
  action: WhennerAction | TodoAction | TodosAction
) {
  let result = todos;
  switch (action.type) {
    case WhennerActionType.InsertTodoSuccess:
      result = todos.map(todo => todo);
      result.push({ ...action.todo });
      break;
    case WhennerActionType.UpdateTodoSuccess:
      console.log("UpdateTodoSuccess", action.todo);
      result = todos.map(todo =>
        todo.id === action.todo.id ? { ...action.todo } : todo
      );
      break;
    case WhennerActionType.LoadTodosSuccess:
      result = action.todos;
      break;
    default:
      break;
  }

  return schedule(chronotype, ...result);
}
