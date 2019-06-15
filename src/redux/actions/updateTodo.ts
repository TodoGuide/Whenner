import { ITodo } from "../../models/Todo";
import { TodoAction } from "./TodoAction";
import { WhennerActionType } from "./WhennerActionType";

export function updateTodo(todo: ITodo): TodoAction {
  console.log("updateTodo", todo);
  return {
    type: WhennerActionType.UpdateTodo,
    todo: Object.assign({}, todo)
  };
}
