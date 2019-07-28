import { IChronotype } from "./Chronotype";
import moment from "moment";
import { Duration } from "moment";
import { Period } from "./time/Period";
import { latestOf } from "./time/utils";

/**
 * A period of time during the day which Todos can be completed.
 */
export interface IChronotype {
  readonly start: Duration;
  readonly end: Duration;
}

export const defaultChronotype: IChronotype = {
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

export function period(date: Date, chronotype: IChronotype): Period {
  return {
    start: startOf(date, chronotype),
    end: endOf(date, chronotype)
  };
}

export function preferredStart(candidateStart: Date, chronotype: IChronotype) {
  return latestOf(startOf(candidateStart, chronotype), candidateStart);
}

export function lengthInMinutes({ start, end }: IChronotype){
  return end.asMinutes() - start.asMinutes();
}