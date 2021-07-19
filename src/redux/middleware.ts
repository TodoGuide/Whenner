// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright (C) 2019  James Tharpe

import { Dispatch, Middleware, MiddlewareAPI } from "redux";
import { WhennerState } from ".";
import { EVENT_ACTION_PREFIX } from "./common/actions";
import { beginLoad } from "./common/actions/beginLoad";
import { loadEvents } from "./events/actions/loadEvents";

export const logger: Middleware = () => (next: Dispatch) => (action) => {
  console.log("Action Dispatched", action);
  return next(action);
};

export function autoDispatcher(
  condition: (action: any) => boolean,
  actionCreator: () => any
): Middleware {
  return ({ dispatch }: MiddlewareAPI<Dispatch, WhennerState>) =>
    (next: Dispatch) =>
    (action) => {
      if (condition(action)) {
        const autoAction = actionCreator();
        console.debug("autoDispatcher dispatch", { action, autoAction });
        dispatch(autoAction);
      } else {
        // console.debug("autoDispatcher, nothing to dispatch", action);
      }
      return next(action);
    };
}

export const thunkCounter = autoDispatcher(
  (action) => typeof action === "function",
  beginLoad
);

export const reloadEventsOnUpsertSuccess = autoDispatcher(
  (action) =>
    action.type.startsWith(EVENT_ACTION_PREFIX) &&
    !action.type.startsWith(EVENT_ACTION_PREFIX + "Load."),
  loadEvents
);
