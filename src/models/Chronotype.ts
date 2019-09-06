// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright (C) 2019  James Tharpe

import { Chronotype } from "./Chronotype";
import moment from "moment";
import { Duration } from "moment";
import { Period } from "./time/Period";
import { latestOf } from "./time/utils";

/**
 * A period of time during the day which Todos can be completed.
 */
export interface Chronotype {
  readonly start: Duration;
  readonly end: Duration;
}

export const defaultChronotype: Chronotype = {
  start: moment.duration("7:15"), // 7:15am
  end: moment.duration("19:00") // 7:00pm
};

export function startOf(date: Date, { start }: { start: Duration }) {
  return moment(date)
    .startOf("day")
    .add(start)
    .toDate();
}

export function endOf(date: Date, { end }: { end: Duration }) {
  return moment(date)
    .startOf("day")
    .add(end)
    .toDate();
}

export function period(date: Date, chronotype: Chronotype): Period {
  return {
    start: startOf(date, chronotype),
    end: endOf(date, chronotype)
  };
}

export function preferredStart(candidateStart: Date, chronotype: Chronotype) {
  return latestOf(startOf(candidateStart, chronotype), candidateStart);
}

export function lengthInMinutes({ start, end }: Chronotype) {
  return end.asMinutes() - start.asMinutes();
}
