import { ITodo } from "../../models/Todo";
import { TodoAction } from "./TodoAction";
import { WhennerActionType } from "./WhennerActionType";

export function upsertTodo(todo: ITodo): TodoAction {
  console.log("upsertTodo", todo);
  return {
    type: WhennerActionType.UpsertTodo,
    todo
  };
}
