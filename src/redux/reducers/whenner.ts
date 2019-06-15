import { State, initialState } from "../State";
import { WhennerAction } from "../actions/WhennerAction";
import { todos } from "./todos";
import { settings } from "./settings";
import { combineReducers } from "redux";

export function whenner(
  state: State = initialState,
  action: WhennerAction
): State {
  // console.log("Old State", state);
  const result = {
    todos: todos((state || initialState), action),
    settings: settings((state || initialState).settings, action)
  };
  // console.log("New State", result);
  localStorage.setItem("WhennerState", JSON.stringify(result));
  return result;
}

// const whenner2 = combineReducers( {
//   todos, settings
// })
