import { settings } from "./settings/reducers";
import { combineReducers } from "redux";
import { todos } from "./todos/reducers";
import { Settings } from "../models/Settings";
import { ITodo } from "../models/Todo";
import { defaultSettings } from "../services/SettingsService";
import { defaultTodos } from "../services/TodosService";
import { loadsInProgress } from "./common/reducers"

// State //

export interface WhennerState {
  settings: Settings;
  todos: ITodo[];
  loadsInProgress: number;
  // appointments: IAppointment[];
}

export const initialState: WhennerState = {
  settings: defaultSettings,
  todos: defaultTodos,
  loadsInProgress: 0
};

// Reducer //

export const reducer = combineReducers({
  todos: todos,
  settings,
  loadsInProgress
});

// export function reducer(
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
