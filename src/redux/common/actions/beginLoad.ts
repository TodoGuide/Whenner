// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright (C) 2019  James Tharpe

import { WhennerActionType, WhennerAction } from ".";

export function beginLoad(): WhennerAction {
  return { type: WhennerActionType.BeginLoad };
}
