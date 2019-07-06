import { settings } from "./settings/reducers";
import { combineReducers, AnyAction } from "redux";
import { todos } from "./todos/reducers";
import { Settings } from "../models/Settings";
import { ITodo } from "../models/Todo";
import { defaultSettings } from "../services/SettingsService";
import { defaultTodos } from "../services/TodosService";

export enum WhennerActionType {
  InsertTodoSuccess = "InsertTodoSuccess",
  UpdateTodoSuccess = "UpsertTodoSuccess",
  LoadTodosSuccess = "LoadTodosSuccess"
}

export interface WhennerAction extends AnyAction {
  type: WhennerActionType;
}

export interface WhennerState {
  settings: Settings;
  todos: ITodo[];
  // appointments: IAppointment[];
}

export const initialState: WhennerState = {
  settings: defaultSettings,
  todos: defaultTodos
};


export const reducer = combineReducers({
  todos,
  settings
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