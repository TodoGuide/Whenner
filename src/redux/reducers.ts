import { ITodo, schedule } from "../models/Todo";
import { WhennerAction, WhennerActionType } from "./actions";

export function todos(state: ITodo[] = [], action: WhennerAction) {
  let result = state;
  switch (action.type) {
    case WhennerActionType.CreateTodo:
      result = [
        ...state,
        Object.assign({}, action.todo)
      ];
      break;
    case WhennerActionType.UpdateTodo:
        result = state.map((todo) => {
        // console.log("todos reducer, update", {todo, action });
        return todo.id === action.todo.id ? Object.assign({}, action.todo) : todo
      });
      break;
    // default:
    //   return state;
  }
  console.log("todos reducer completed", { oldState: state, newState: result });
  return schedule(...result);
}
