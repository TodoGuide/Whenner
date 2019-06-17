import { ITodo } from "../../models/Todo";
import { TodoAction } from "./TodoAction";
import { WhennerActionType } from "./WhennerActionType";

export function createTodo(todo: ITodo): TodoAction {
  console.log("createTodo", todo);
  return {
    type: WhennerActionType.CreateTodo,
    todo: { ...todo }
  };
}