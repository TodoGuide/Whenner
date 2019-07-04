import { WhennerAction } from "./WhennerAction";
import { ITodo } from "../../models/Todo";
import { Dispatch } from "redux";
import { Chronotype } from "../../models/Chronotype";

export interface TodoAction extends WhennerAction {
  todo: ITodo;
  chronotype: Chronotype
}

export interface TodoActionThunk {
  (todo: ITodo, chronotype: Chronotype): { (dispatch: Dispatch): Promise<TodoAction> }
} 

export interface TodoActionDispatch {
  (todo: ITodo, chronotype: Chronotype): void
}