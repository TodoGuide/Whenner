import { WhennerAction } from "./WhennerAction";
import { ITodo } from "../../models/Todo";
import { Dispatch } from "redux";

export interface TodoAction extends WhennerAction {
  todo: ITodo;
}

export interface TodoActionThunk {
  (dispatch: Dispatch): Promise<TodoAction>
} 

export interface TodoActionDispatch {
  (todo: ITodo): void
}