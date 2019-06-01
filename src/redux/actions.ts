import { ITodo } from "../model/Todo";

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