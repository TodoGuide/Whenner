import { WhennerActionType } from "./WhennerActionType";

export interface WhennerAction {
  type: WhennerActionType;
  [x: string]: any;
}