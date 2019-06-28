import { WhennerAction } from "./WhennerAction";
import { ITodo } from "../../models/Todo";
import { Dispatch } from "redux";

export interface TodosAction extends WhennerAction {
  todos: ITodo[];
}

export interface TodosActionThunk {
  (dispatch: Dispatch): Promise<TodosAction>
}

export interface TodosActionDispatch {
  (todo: ITodo[]): void
}