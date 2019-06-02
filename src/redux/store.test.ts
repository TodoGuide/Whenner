import {
  TodoAction,
  WhennerActionType,
  updateTodo,
  createTodo
} from "./actions";
import { WhennerStore } from "./store";
import { ITodo } from "../models/Todo";

describe("The whenner store", () => {
  it("Allows a to-do item to be added", () => {
    const whennerStore = WhennerStore.newContainer().getInstance();
    expect(whennerStore.getState().todos.length).toEqual(1); // Default to-do
    whennerStore.dispatch({
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
    expect(whennerStore.getState().todos.length).toEqual(2);
    expect(whennerStore.getState().todos[1].title).toEqual("Test");
  });

  it("Allows to-do items to be added", () => {
    const whennerStore = WhennerStore.newContainer().getInstance();
    whennerStore.dispatch(
      createTodo({
        id: Date.now(),
        title: "Test",
        description: "Test",
        estimate: 5,
        start: new Date(),
        done: false
      })
    );
    expect(whennerStore.getState().todos.length).toEqual(2);
    expect(whennerStore.getState().todos[1].title).toEqual("Test");
  });

  it("Allows to-do items to be updated", () => {
    const whennerStore = WhennerStore.newContainer().getInstance();

    const todo: ITodo = {
      id: Date.now(),
      title: "New item",
      description: "Test",
      estimate: 5,
      start: new Date(),
      done: false
    };

    whennerStore.dispatch(createTodo(todo));

    todo.title = "Updated Item";
    expect(whennerStore.getState().todos[1].title).toEqual("New item");

    whennerStore.dispatch(updateTodo(todo));

    expect(whennerStore.getState().todos[1].title).toEqual("Updated Item");
  });
});
