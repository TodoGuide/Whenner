import { Store } from "./Store";
import { Store as ReduxStore } from "redux";
import { ITodo } from "../models/Todo";
import { State, initialState } from "./State";
import { WhennerAction } from "./actions/WhennerAction";
import { customMatchers } from "../test/matchers";
import { Time } from "../models/time";

describe("The Whenner Store", () => {
  beforeEach(() => {
    jasmine.addMatchers(customMatchers);
    Time.current = () => new Date(2019, 6, 5, 12, 0, 0, 0); // 2019-07-05 at Noon
    Time.now = () => Time.current().getTime();
  });

  describe("Given the default state", () => {
    let store: ReduxStore<State, WhennerAction>;

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
