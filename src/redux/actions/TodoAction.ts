import { WhennerAction } from "./WhennerAction";
import { ITodo } from "../../models/Todo";

export interface TodoAction extends WhennerAction {
  todo: ITodo;
}

export interface TodoActionDispatch {
  (todo: ITodo): void
}