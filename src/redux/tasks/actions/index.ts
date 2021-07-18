// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright (C) 2019  James Tharpe

import { Dispatch } from "redux";
import { WhennerAction } from "../../common/actions";
import { Event } from "../../../models/Event";

// TODO: Update redux-thunk when new NPM package is available: https://github.com/reduxjs/redux-thunk/pull/224
//   This will allow bindActionCreators to return the proper signature/type.

export interface EventAction extends WhennerAction {
  readonly event: Event;
}

export interface EventActionThunk {
  (event: Event): { (dispatch: Dispatch): Promise<EventAction> };
}

export interface EventResultAction extends WhennerAction {
  readonly events: Event[];
}

export interface EventsResultActionThunk {
  (): { (dispatch: Dispatch): Promise<EventResultAction> };
}
