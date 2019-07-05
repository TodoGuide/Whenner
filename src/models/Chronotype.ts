import * as moment from "moment";
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