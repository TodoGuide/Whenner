import { settings } from "./settings/reducers";
import { combineReducers } from "redux";
import { tasks } from "./todos/reducers";
import { Settings } from "../models/Settings";
import { defaultSettings } from "../services/SettingsService";
import { defaultTasks } from "../services/TasksService";
import { loadsInProgress } from "./common/reducers"
import { ITask } from "../models/Task";

// State //

export interface WhennerState {
  settings: Settings;
  tasks: ITask[];
  loadsInProgress: number;
  // appointments: IAppointment[];
}

export const initialState: WhennerState = {
  settings: defaultSettings,
  tasks: defaultTasks,
  loadsInProgress: 0
};

// Reducer //

export const reducer = combineReducers({
  tasks,
  settings,
  loadsInProgress
});

// export function reducer(
//   state: State = initialState,
//   action: WhennerAction
// ): State {
//   console.log("whenner reducer", { state, action });
//   const result = {
//     tasks: tasks(state.tasks, action),
//     settings: settings(state.settings, action)
//   };
//   // console.log("New State", result);
//   localStorage.setItem("WhennerState", JSON.stringify(result));
//   localStorage.setItem("Whenner.Tasks", JSON.stringify(result.tasks));
//   return result;
// }
