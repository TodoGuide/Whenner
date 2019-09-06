// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright (C) 2019  James Tharpe

import { Start } from "./Start";
import { End } from "./End";

export interface Estimated {
  readonly estimate: number;
}

export type StartEstimated = Start & Estimated;
export type EndEstimated = End & Estimated;

export function estimated(item: any): Estimated | undefined {
  const { estimate = undefined } = item || {};
  if (estimate || (estimate === 0 && estimate instanceof Number)) {
    return item;
  }

  return undefined;
}
