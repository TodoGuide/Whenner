import { State, initialState } from "../State";
import { WhennerAction } from "../actions/WhennerAction";
import { todos } from "./todos";
import { settings } from "./settings";

/**
 * The primary Redux reducer for the Whenner application
 *
 * @export
 * @param {State} [state=initialState]
 * @param {WhennerAction} action
 * @returns {State}
 */
export function whenner(
  state: State = initialState,
  action: WhennerAction
): State {
  // console.log("Old State", state);
  const result = {
    todos: todos(state, action),
    settings: settings(state.settings, action)
  };
  // console.log("New State", result);
  localStorage.setItem("WhennerState", JSON.stringify(result));
  localStorage.setItem("Whenner.Todos", JSON.stringify(result.todos));
  return result;
}

// const whenner2 = combineReducers( {
//   todos, settings
// })
