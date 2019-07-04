import { Store } from "./Store";
import { Store as ReduxStore } from "redux";
import { ITodo } from "../models/Todo";
import { WhennerActionType } from "./actions/WhennerActionType";
import { State, initialState } from "./State";
import { WhennerAction } from "./actions/WhennerAction";
import { oneHourTodo } from "../test/data";
import { customMatchers } from "../test/matchers";

describe("The Whenner Store", () => {
  beforeEach(() => {
    jasmine.addMatchers(customMatchers);
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
