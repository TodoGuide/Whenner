// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright (C) 2019  James Tharpe

import { combineReducers } from "redux";
import { schedule } from "./schedule/reducers";
import { loadsInProgress } from "./common/reducers";
import { Schedule } from "../models/Schedule";
import { defaultChronotype } from "../models/Chronotype";
import { defaultEvents } from "../services/EventsService";

// State //

export interface WhennerState {
  readonly schedule: Schedule;
  readonly loadsInProgress: number;
  // appointments: IAppointment[];
}

export const initialState: WhennerState = {
  schedule: {
    chronotype: defaultChronotype,
    events: defaultEvents,
  },
  loadsInProgress: 0,
};

// Reducer //

export const reducer = combineReducers({
  schedule,
  loadsInProgress,
});
