import { WhennerActionType, WhennerAction } from ".";

export function beginLoad(): WhennerAction {
  return { type: WhennerActionType.BeginLoad }
}