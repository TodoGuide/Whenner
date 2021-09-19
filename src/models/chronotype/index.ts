// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright (C) 2019  James Tharpe

import moment from "moment";
import { Duration } from "moment";
import Period from "../time/period";
import { latestOf } from "../time";

/**
 * A period of time during the day which someone can be productive
 */
export default interface Chronotype {
  readonly start: Duration;
  readonly end: Duration;
}

export function startOfDayFor(date: Date, chronotype: Chronotype) {
  return moment(date).startOf("day").add(chronotype.start).toDate();
}

export function endOfDayFor(date: Date, chronotype: Chronotype) {
  return moment(date).startOf("day").add(chronotype.end).toDate();
}

export function capacitivePeriod(date: Date, chronotype: Chronotype): Period {
  return {
    start: startOfDayFor(date, chronotype),
    end: endOfDayFor(date, chronotype),
  };
}

export function incapacitativePeriod(
  date: Date,
  chronotype: Chronotype
): Period {
  return {
    start: endOfDayFor(date, chronotype),
    end: startOfDayFor(date, chronotype),
  };
}

export function preferredStart(
  candidateStart: Date,
  chronotype: Chronotype
): Date {
  return latestOf(startOfDayFor(candidateStart, chronotype), candidateStart);
}

export function lengthInMinutes({ start, end }: Chronotype): number {
  return end.asMinutes() - start.asMinutes();
}
