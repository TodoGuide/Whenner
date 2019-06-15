import { oneHourTodo } from "../../models/testData";
import { WhennerActionType } from "./WhennerActionType";
import { updateTodo } from "./updateTodo";

describe('The updateTodo Action Creator', () => {
  describe('Given a valid Todo', () => {

    describe('When updateTodo is called, it...', () => {
      const action = updateTodo(oneHourTodo);

      it("Returns an Action of type UpdateTodo", () => {
        expect(action.type).toBe(WhennerActionType.UpdateTodo);
      });

      it("Returns an Action with a copy of the todo", () => {
        expect(action.todo).toEqual(oneHourTodo);
        expect(action.todo).not.toBe(oneHourTodo);
      });
    });
  });
});