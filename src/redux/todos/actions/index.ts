import { ITodo } from "../../../models/Todo";
import { Dispatch } from "redux";
import { WhennerAction } from "../..";


// TODO: Update redux-thunk when new NPM package is available: https://github.com/reduxjs/redux-thunk/pull/224
//   This will allow bindActionCreators to return the proper signature/type.

export interface TodoAction extends WhennerAction {
  todo: ITodo;
}

export interface TodoActionThunk {
  (todo: ITodo): { (dispatch: Dispatch): Promise<TodoAction> }
}

export interface TodosResultAction extends WhennerAction {
  todos: ITodo[];
}

export interface TodosResultActionThunk {
  (): { (dispatch: Dispatch): Promise<TodosResultAction> }
}