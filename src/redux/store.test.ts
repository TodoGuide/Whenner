// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright (C) 2019  James Tharpe

import { Store } from "./store";
import { Store as ReduxStore } from "redux";
import { Time } from "../models/time";
import { WhennerState, initialState } from ".";
import { WhennerAction } from "./common/actions";
import { defaultAppointments } from "../models/Appointment";
import { defaultEvents } from "../services/EventsService";

describe("The Whenner Store", () => {
  beforeEach(() => {
    Time.set(new Date(2019, 6, 5, 12, 0, 0, 0)); // 2019-07-05 at Noon
  });

  describe("Given the default state, it...", () => {
    let store: ReduxStore<WhennerState, WhennerAction>;

    beforeEach(() => {
      store = Store.newContainer().getInstance();
    });

    it("Contains the default Schedule", () => {
      const schedule = store.getState().schedule;
      expect(schedule.events).toEqual(defaultEvents);

      // Check that the default Todo was scheduled
      expect(schedule.events[0]).toEqual(initialState.schedule.events[0]);

      // TODO: Verify appointments
    });
  });
});
