import moment from "moment";
import { Duration } from "moment";

/**
 * The typical period of time during which Todos can be completed.
 *
 * @export
 * @interface Chronotype
 */
export interface Chronotype {
  start: Duration;
  end: Duration;
}

export const defaultChronotype: Chronotype = {
  start: moment.duration("7:15"), // 7:15am
  end: moment.duration("20:00") // 7:00pm
};

export function lengthInMinutes({ start, end }: Chronotype) {
  return end.asMinutes() - start.asMinutes();
}

/**
 * Calculates when the day starts for the specified Chronotype and date
 *
 * @export
 * @param {Date} date
 * @param {(Chronotype | { start: Duration })} { start }
 * @returns
 */
export function chronotypeDayStart(date: Date, { start }: Chronotype | { start: Duration }){
  return moment(date)
    .startOf("day")
    .add(start)
    .toDate();
}

/**
 * Calculates when the day ends for the specified Chronotype and date
 *
 * @export
 * @param {Date} date
 * @param {(Chronotype | { end: Duration })} { end }
 * @returns
 */
export function chronotypeDayEnd(date: Date, { end }: Chronotype | { end: Duration }){
  return moment(date)
    .startOf("day")
    .add(end)
    .toDate();
}