import { WhennerAction } from "./WhennerAction";
import { ITodo } from "../../models/Todo";

export interface TodoAction extends WhennerAction {
  todo: ITodo;
}