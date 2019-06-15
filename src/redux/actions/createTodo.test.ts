import { createTodo } from "./createTodo";
import { oneHourTodo } from "../../models/testData";
import { WhennerActionType } from "./WhennerActionType";

describe('The createTodo Action Creator', () => {
  describe('Given a valid Todo', () => {

    describe('When createTodo is called, it...', () => {
      const action = createTodo(oneHourTodo);

      it("Returns an Action of type CreateTodo", () => {
        expect(action.type).toBe(WhennerActionType.CreateTodo);
      });

      it("Returns an Action with a copy of the todo", () => {
        expect(action.todo).toEqual(oneHourTodo);
        expect(action.todo).not.toBe(oneHourTodo);
      });
    });
  });
});