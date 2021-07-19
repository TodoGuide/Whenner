// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright (C) 2019  James Tharpe

import { EventResultAction, EventsResultActionThunk } from ".";
import { Dispatch } from "redux";
import { eventsService } from "../../../services/services";
import { WhennerActionType } from "../../common/actions";
import { Event } from "../../../models/Event";

function loadEventsSuccess(events: Event[]): EventResultAction {
  return {
    type: WhennerActionType.LoadEventsSuccess,
    events,
  };
}

/**
 * A thunk to load todo items
 */
export const loadEvents: EventsResultActionThunk = () => {
  return function (dispatch: Dispatch) {
    return eventsService
      .read()
      .then((tasks) => dispatch(loadEventsSuccess(tasks)))
      .catch((e) => {
        console.log("loadEvents error", e);
        throw e;
      });
  };
};
