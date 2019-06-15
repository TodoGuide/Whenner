import { Store } from "./Store";
import { Store as ReduxStore } from "redux";
import { ITodo } from "../models/Todo";
import { WhennerActionType } from "./actions/WhennerActionType";
import { createTodo } from "./actions/createTodo";
import { updateTodo } from "./actions/updateTodo";
import { State } from "./State";
import { WhennerAction } from "./actions/WhennerAction";

describe("The Whenner Store", () => {
  let store: ReduxStore<State, WhennerAction>;
  it("Allows a to-do item to be added", () => {
    const store = Store.newContainer().getInstance();
    expect(store.getState().todos.length).toEqual(1); // Default to-do
    store.dispatch({
      type: WhennerActionType.CreateTodo,
      todo: {
        id: Date.now(),
        title: "Test",
        description: "Test",
        estimate: 5,
        start: new Date(),
        done: false
      }
    });
    expect(store.getState().todos.length).toBe(2);
    expect(store.getState().todos[1].title).toBe("Test");
  });

  it("Allows to-do items to be added", () => {
    const store = Store.newContainer().getInstance();
    store.dispatch(
      createTodo({
        id: Date.now(),
        title: "Test",
        description: "Test",
        estimate: 5,
        start: new Date(),
        done: false
      })
    );
    expect(store.getState().todos.length).toEqual(2);
    expect(store.getState().todos[1].title).toEqual("Test");
  });

  it("Allows to-do items to be updated", () => {
    const store = Store.newContainer().getInstance();

    const todo: ITodo = {
      id: Date.now(),
      title: "New item",
      description: "Test",
      estimate: 5,
      start: new Date(),
      done: false
    };

    store.dispatch(createTodo(todo));

    todo.title = "Updated Item";
    expect(store.getState().todos[1].title).toEqual("New item");

    store.dispatch(updateTodo(todo));

    expect(store.getState().todos[1].title).toEqual("Updated Item");
  });
});
