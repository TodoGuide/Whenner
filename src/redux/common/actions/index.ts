import { AnyAction } from "redux";

export const TODO_ACTION_PREFIX = "Todo.";
export const ACTION_SUCCESS_SUFFIX = ".Success"

export enum WhennerActionType {
  // Common Actions
  BeginLoad = "BeginLoad",
  // Todo Actions
  InsertTodoSuccess = "Todo.Insert.Success",
  UpdateTodoSuccess = "Todo.Upsert.Success",
  LoadTodosSuccess = "Todo.Load.Success"
}

export interface WhennerAction extends AnyAction {
  type: WhennerActionType;
}