import { ITodo } from "../model/Todo";
import { WhennerAction, WhennerActionType } from "./actions";

export function todos(state: ITodo[] = [], action: WhennerAction) {
  switch (action.type) {
    case WhennerActionType.CreateTodo:
      return [
        ...state,
        Object.assign({}, action.todo)
      ];
    case WhennerActionType.UpdateTodo:
      return state.map((todo, index) =>
        index === action.index ? Object.assign({}, action.todo) : todo
      );
    default:
      return state;
  }
}
