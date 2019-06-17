import { createTodo } from "./createTodo";
import { oneHourTodo } from "../../test/data";
import { WhennerActionType } from "./WhennerActionType";

describe("The createTodo Action Creator", () => {
  describe("Given a valid Todo", () => {
    describe("When createTodo is called, it...", () => {
      const action = createTodo(oneHourTodo);

      it("Returns an Action of type CreateTodo", () => {
        expect(action.type).toBe(WhennerActionType.CreateTodo);
      });

      it("Returns an Action with the todo", () => {
        expect(action.todo).toBe(oneHourTodo);
      });
    });
  });
});
