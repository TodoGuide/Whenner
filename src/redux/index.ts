import { combineReducers } from "redux";
import { schedule } from "./schedule/reducers";
import { loadsInProgress } from "./common/reducers"
import { ISchedule, defaultSchedule } from "../models/Schedule";

// State //

export interface WhennerState {
  schedule: ISchedule;
  loadsInProgress: number;
  // appointments: IAppointment[];
}

export const initialState: WhennerState = {
  schedule: defaultSchedule,
  loadsInProgress: 0
};

// Reducer //

export const reducer = combineReducers({
  schedule,
  loadsInProgress
});