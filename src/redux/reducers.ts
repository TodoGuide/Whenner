import { ITodo } from "../models/Todo";
import { WhennerAction, WhennerActionType } from "./actions";
import { defaultSettings, Settings } from "../models/Settings";
import { schedule } from "../models/schedule";

export function todos(
  state: ITodo[] = [],
  { dayStart: startTime, dayEnd: endTime }: Settings,
  action: WhennerAction
) {
  let result = state;
  switch (action.type) {
    case WhennerActionType.CreateTodo:
      result = [...state, Object.assign({}, action.todo)];
      break;
    case WhennerActionType.UpdateTodo:
      result = state.map(todo =>
        todo.id === action.todo.id ? Object.assign({}, action.todo) : todo
      );
      break;
    default:
      break;
  }

  return schedule({ dayStart: startTime, dayEnd: endTime }, ...result);
}

export function settings(
  state: Settings = defaultSettings,
  action: WhennerAction
) {
  return state;
}
