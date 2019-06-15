import { ITodo } from "../../models/Todo";
import { WhennerAction } from "../actions/WhennerAction";
import { WhennerActionType } from "../actions/WhennerActionType";
import { Settings } from "../../models/Settings";
import { schedule } from "../../models/schedule";
import { State } from "../State";

export function todos(
  { todos, settings: { dayStart: startTime, dayEnd: endTime } }: State,
  action: WhennerAction
) {
  let result = todos;
  switch (action.type) {
    case WhennerActionType.CreateTodo:
      result = [...todos, Object.assign({}, action.todo)];
      break;
    case WhennerActionType.UpdateTodo:
      result = todos.map(todo =>
        todo.id === action.todo.id ? Object.assign({}, action.todo) : todo
      );
      break;
    default:
      break;
  }

  return schedule({ dayStart: startTime, dayEnd: endTime }, ...result);
}