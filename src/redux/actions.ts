import { ITodo } from "../models/Todo";

export enum WhennerActionType {
  CreateTodo = "CreateTodo",
  UpdateTodo = "UpdateTodo"
}

export interface WhennerAction {
  type: WhennerActionType;
  [x: string]: any;
}

export interface TodoAction extends WhennerAction {
  todo: ITodo;
}

export function createTodo(todo: ITodo){
  return {
    type: WhennerActionType.CreateTodo,
    todo: Object.assign({}, todo)
  }
}

export function updateTodo(todo: ITodo){
  return {
    type: WhennerActionType.UpdateTodo,
    todo: Object.assign({}, todo, { title: "Updated Item!!!!" })
  }
}