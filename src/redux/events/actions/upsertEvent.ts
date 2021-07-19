// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright (C) 2019  James Tharpe

import { EventAction, EventActionThunk } from ".";
import { Dispatch } from "redux";
import { eventsService } from "../../../services/services";
import { WhennerActionType } from "../../common/actions";
import { Event } from "../../../models/Event";

// Action Creators

function insertEventSuccess(event: Event): EventAction {
  return {
    type: WhennerActionType.InsertEventSuccess,
    event,
  };
}

function updateEventSuccess(event: Event): EventAction {
  return {
    type: WhennerActionType.UpdateEventSuccess,
    event,
  };
}

// Action Thunks //

export const upsertEvent: EventActionThunk = (event: Event) => {
  return function (dispatch: Dispatch) {
    const result = eventsService
      .upsert(event)
      .then((upsertedEvent) =>
        upsertedEvent.id === event.id
          ? dispatch(updateEventSuccess(upsertedEvent))
          : dispatch(insertEventSuccess(upsertedEvent))
      )
      .catch((e) => {
        throw e;
      });
    return result;
  };
};
