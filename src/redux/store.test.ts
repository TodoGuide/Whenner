import { Store } from "./store";
import { Store as ReduxStore } from "redux";
import { customMatchers } from "../test/matchers";
import { Time } from "../models/time";
import { WhennerAction, WhennerState, initialState } from ".";

describe("The Whenner Store", () => {
  beforeEach(() => {
    jasmine.addMatchers(customMatchers);
    Time.set(new Date(2019, 6, 5, 12, 0, 0, 0)); // 2019-07-05 at Noon
  });

  describe("Given the default state", () => {
    let store: ReduxStore<WhennerState, WhennerAction>;

    beforeEach(() => {
      store = Store.newContainer().getInstance();
    });

    it("Contains the default Todo", () => {
      const todos = store.getState().todos;
      expect(todos.length).toBe(1);

      // Check that the default Todo was scheduled
      expect(todos[0]).toBeScheduledCopyOf(initialState.todos[0]);
    });
  });
});
