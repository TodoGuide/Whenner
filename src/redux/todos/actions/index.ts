import { ITodo } from "../../../models/Todo";
import { Dispatch } from "redux";
import { WhennerAction } from "../..";

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