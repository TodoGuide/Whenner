import { State, initialState } from "../State";
import { WhennerAction } from "../actions/WhennerAction";
import { todos } from "./todos";
import { settings } from "./settings";

export function whenner(
  state: State = initialState,
  action: WhennerAction
): State {
  // console.log("Old State", state);
  const settingsState = (state || initialState).settings;
  const result = {
    todos: todos((state || initialState).todos, settingsState, action),
    settings: settings(settingsState, action)
  };
  // console.log("New State", result);
  localStorage.setItem("WhennerState", JSON.stringify(result));
  return result;
}
