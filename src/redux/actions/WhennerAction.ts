import { WhennerActionType } from "./WhennerActionType";
import { AnyAction } from "redux";

export interface WhennerAction extends AnyAction {
  type: WhennerActionType;
}