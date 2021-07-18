// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright (C) 2019  James Tharpe

import { EventResultAction, EventsResultActionThunk } from ".";
import { Dispatch } from "redux";
import { tasksService } from "../../../services/services";
import { WhennerActionType } from "../../common/actions";
import { Event } from "../../../models/Event";

function loadEventsSuccess(events: Event[]): EventResultAction {
  return {
    type: WhennerActionType.LoadTasksSuccess,
    events,
  };
}

/**
 * A thunk to load todo items
 */
export const loadTasks: EventsResultActionThunk = () => {
  return function (dispatch: Dispatch) {
    return tasksService
      .read()
      .then((tasks) => dispatch(loadEventsSuccess(tasks)))
      .catch((e) => {
        console.log("loadTasks error", e);
        throw e;
      });
  };
};
