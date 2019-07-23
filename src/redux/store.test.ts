import { Store } from "./store";
import { Store as ReduxStore } from "redux";
import { customMatchers } from "../test/matchers";
import { Time } from "../models/Time";
import { WhennerState, initialState } from ".";
import { WhennerAction } from "./common/actions";
import { defaultTasks } from "../models/Task";

describe("The Whenner Store", () => {
  beforeEach(() => {
    jasmine.addMatchers(customMatchers);
    Time.set(new Date(2019, 6, 5, 12, 0, 0, 0)); // 2019-07-05 at Noon
  });

  describe("Given the default state, it...", () => {
    let store: ReduxStore<WhennerState, WhennerAction>;

    beforeEach(() => {
      store = Store.newContainer().getInstance();
    });

    it("Contains the default Schedule", () => {
      const schedule = store.getState().schedule;
      expect(schedule.tasks).toEqual(defaultTasks);

      // Check that the default Todo was scheduled
      expect(schedule.tasks[0]).toBeScheduledCopyOf(initialState.schedule.tasks[0]);

      // TODO: Verify appointments
    });
  });
});
