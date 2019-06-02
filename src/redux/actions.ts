import { ITodo } from "../models/Todo";

export enum WhennerActionType {
  CreateTodo = "CreateTodo",
  UpdateTodo = "UpdateTodo",
  SizeTodo = "SizeTodo"
}

export interface WhennerAction {
  type: WhennerActionType;
  [x: string]: any;
}

export interface TodoAction extends WhennerAction {
  todo: ITodo;
}

export function createTodo(todo: ITodo): TodoAction {
  console.log("createTodo", todo);
  return {
    type: WhennerActionType.CreateTodo,
    todo: Object.assign({}, todo)
  };
}

export function updateTodo(todo: ITodo): TodoAction {
  console.log("updateTodo", todo);
  return {
    type: WhennerActionType.UpdateTodo,
    todo: Object.assign({}, todo)
  };
}
