import { Store } from "./Store";
import { Store as ReduxStore } from "redux";
import { ITodo } from "../models/Todo";
import { WhennerActionType } from "./actions/WhennerActionType";
import { upsertTodo } from "./actions/upsertTodo";
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

    describe("When UpsertTodo is dispatched with new Todo, it...", () => {
      beforeEach(() => {
        store.dispatch({
          type: WhennerActionType.UpsertTodo,
          todo: oneHourTodo
        });
      });

      it("Adds the provided Todo", () => {
        const todos = store.getState().todos;
        expect(todos.length).toBe(2);
        expect(todos[1]).toBeScheduledCopyOf(oneHourTodo);
      });
    });

    describe("When UpsertTodo is dispatched with existing Todo, it...", () => {
      let updatedTodo: ITodo;
      beforeEach(() => {
        updatedTodo = { ...store.getState().todos[0], title: "Updated" };
        expect(updatedTodo.title).toBe("Updated");
        store.dispatch({
          type: WhennerActionType.UpsertTodo,
          todo: updatedTodo
        });
      });

      it("Replaces the Todo with a new copy", () => {
        const todos = store.getState().todos;
        expect(todos.length).toBe(1);
        expect(todos[0]).toBeScheduledCopyOf(updatedTodo);
        expect(todos[0]).not.toBe(updatedTodo);
      });
    });
  });
});
