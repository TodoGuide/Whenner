import { WhennerAction } from "../actions/WhennerAction";
import { WhennerActionType } from "../actions/WhennerActionType";
import { schedule } from "../../models/schedule";
import { State } from "../State";
import { TodoAction } from "../actions/TodoAction";
import { TodosAction } from "../actions/TodosAction";

export function todos(
  { todos, settings: { dayStart: startTime, dayEnd: endTime } }: State,
  action: WhennerAction | TodoAction | TodosAction
) {
  let result = todos;
  switch (action.type) {
    case WhennerActionType.UpsertTodoSuccess:
      console.log("UpsertTodo", action.todo);
      let updated = false;
      result = todos.map(todo => {
        const isSameTodo = todo.id === action.todo.id;
        updated = isSameTodo || updated;
        return isSameTodo
          ? { ...action.todo }
          : todo;
      });
      if (!updated) {
        result.push({ ...action.todo });
      }
      break;
    case WhennerActionType.LoadTodosSuccess:
      result = action.todos;
      break;
    default:
      break;
  }

  return schedule({ dayStart: startTime, dayEnd: endTime }, ...result);
}
