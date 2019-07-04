import { todos } from "./todos";
import { settings } from "./settings";
import { combineReducers } from "redux";

// export function whenner(
//   state: State = initialState,
//   action: WhennerAction
// ): State {
//   console.log("whenner reducer", { state, action });
//   const result = {
//     todos: todos(state.todos, action),
//     settings: settings(state.settings, action)
//   };
//   // console.log("New State", result);
//   localStorage.setItem("WhennerState", JSON.stringify(result));
//   localStorage.setItem("Whenner.Todos", JSON.stringify(result.todos));
//   return result;
// }

export const whenner = combineReducers({
  todos,
  settings
});
