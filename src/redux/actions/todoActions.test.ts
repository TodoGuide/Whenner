import { upsertTodo } from "./todoActions";
import { oneHourTodo } from "../../test/data";
import { WhennerActionType } from "./WhennerActionType";

describe("The upsertTodo Action Creator", () => {
  describe("Given a valid Todo", () => {
    describe("When upsertTodo is called, the resulting action...", () => {
      const action = upsertTodo(oneHourTodo);

      it("Is of type UpsertTodo", () => {
        expect(action.type).toBe(WhennerActionType.UpsertTodo);
      });

      it("Has the given todo", () => {
        expect(action.todo).toBe(oneHourTodo);
      });
    });
  });
});
