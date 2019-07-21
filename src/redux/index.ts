import { settings } from "./settings/reducers";
import { combineReducers } from "redux";
import { schedule } from "./schedule/reducers";
import { Settings } from "../models/Settings";
import { defaultSettings } from "../services/SettingsService";
import { loadsInProgress } from "./common/reducers"
import { ISchedule, defaultSchedule } from "../models/Schedule";

// State //

export interface WhennerState {
  settings: Settings;
  schedule: ISchedule;
  loadsInProgress: number;
  // appointments: IAppointment[];
}

export const initialState: WhennerState = {
  settings: defaultSettings,
  schedule: defaultSchedule,
  loadsInProgress: 0
};

// Reducer //

export const reducer = combineReducers({
  schedule,
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
