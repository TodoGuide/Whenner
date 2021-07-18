// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright (C) 2019  James Tharpe

import { EventAction, EventActionThunk } from ".";
import { Dispatch } from "redux";
import { tasksService } from "../../../services/services";
import { WhennerActionType } from "../../common/actions";
import { Event } from "../../../../src/models/Event";

// Action Creators

function insertEventSuccess(event: Event): EventAction {
  return {
    type: WhennerActionType.InsertTaskSuccess,
    event,
  };
}

function updateEventSuccess(event: Event): EventAction {
  return {
    type: WhennerActionType.UpdateTaskSuccess,
    event,
  };
}

// Action Thunks //

export const upsertEvent: EventActionThunk = (event: Event) => {
  return function (dispatch: Dispatch) {
    const result = tasksService
      .upsert(event)
      .then((upsertedTask) =>
        upsertedTask.id === event.id
          ? dispatch(updateEventSuccess(upsertedTask))
          : dispatch(insertEventSuccess(upsertedTask))
      )
      .catch((e) => {
        throw e;
      });
    return result;
  };
};
