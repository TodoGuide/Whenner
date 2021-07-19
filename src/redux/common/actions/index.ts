// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright (C) 2019  James Tharpe

import { AnyAction } from "redux";

export const EVENT_ACTION_PREFIX = "Event.";
export const ACTION_SUCCESS_SUFFIX = ".Success";

export enum WhennerActionType {
  // Common Actions
  BeginLoad = "BeginLoad",
  // Todo Actions
  InsertEventSuccess = "Event.Insert.Success",
  UpdateEventSuccess = "Event.Upsert.Success",
  LoadEventsSuccess = "Event.Load.Success",
}

export interface WhennerAction extends AnyAction {
  readonly type: WhennerActionType;
}
