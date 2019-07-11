import { initialState } from "..";
import {
  WhennerAction,
  WhennerActionType,
  ACTION_SUCCESS_SUFFIX
} from "./actions";

// Note: Dispatched by middleware
export function loadsInProgress(
  state = initialState.loadsInProgress,
  action: WhennerAction
): number {
  if (action.type === WhennerActionType.BeginLoad) {
    return state + 1;
  } else if (action.type.endsWith(ACTION_SUCCESS_SUFFIX)) {
    return state - 1;
  }

  return state;
}
