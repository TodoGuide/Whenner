import { ITodo } from "../models/Todo";
import { WhennerAction, WhennerActionType } from "./actions";

export function todos(state: ITodo[] = [], action: WhennerAction) {
  console.log("todos reducer, old state", state);
  switch (action.type) {
    case WhennerActionType.CreateTodo:
      return [
        ...state,
        Object.assign({}, action.todo)
      ];
    case WhennerActionType.UpdateTodo:
      return state.map((todo) => {
        console.log("todos reducer, update", {todo, action });
        return todo.id === action.todo.id ? Object.assign({}, action.todo) : todo
      });
    default:
      return state;
  }
}
