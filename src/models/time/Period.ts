// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright (C) 2019  James Tharpe

import { Start } from "./Start";
import { End } from "./End";
import { MILLISECONDS_PER_MINUTE } from "./constants";

export type Period = Start & End;

export function periodOf(item: any): Period | undefined {
  const { start = undefined, end = undefined } = item || {};
  if (start instanceof Date && end instanceof Date) {
    return item;
  }
  return undefined;
}

export function periodsOverlap(period1: Period, period2: Period) {
  return (
    (period1.start < period2.start && period1.end > period2.start) ||
    (period1.start > period2.start && period1.start < period2.end)
  );
}

export function lengthInMinutes(period: Period) {
  return (
    (period.end.getTime() - period.start.getTime()) / MILLISECONDS_PER_MINUTE
  );
}
