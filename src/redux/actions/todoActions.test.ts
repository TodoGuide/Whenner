import { upsertTodoSuccess } from "./todoActions";
import { oneHourTodo } from "../../test/data";
import { WhennerActionType } from "./WhennerActionType";

describe("The upsertTodoSuccess Action Creator", () => {
  describe("Given a valid Todo", () => {
    describe("When upsertTodo is called, the resulting action...", () => {
      const action = upsertTodoSuccess(oneHourTodo);

      it("Is of type upsertTodoSuccess", () => {
        expect(action.type).toBe(WhennerActionType.UpsertTodoSuccess);
      });

      it("Has the given todo", () => {
        expect(action.todo).toBe(oneHourTodo);
      });
    });
  });
});
