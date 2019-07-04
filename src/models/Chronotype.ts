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

/*

Why the term "Chronality"?

Chronal means "of or relating to time".

Diurnality: Behavior characterized by activity during daytime.
Nocturnality: Behavior characterized by activity during nighttime.
Metaturnality: Behaviour characterized by sporadic, irregular intervals of activity during the day or night.

AFAICT, there is no word meaning "the time period characterized by activity" that is independent of
the specific timeperiod, so "chronality" seemed to make sense as a semi-madeup word.

*/
