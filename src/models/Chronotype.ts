import moment from "moment";
import { Duration } from "moment";
import { DateRange } from "./DateRange";

/**
 * The typical period of time during which Todos can be completed.
 *
 * @export
 * @interface Chronotype
 */
export interface IChronotype {
  start: Duration;
  end: Duration;
}

export const defaultChronotype: IChronotype = {
  start: moment.duration("7:15"), // 7:15am
  end: moment.duration("20:00") // 7:00pm
};

export class Chronotype implements IChronotype {
  constructor(chronotype: IChronotype = defaultChronotype) {
    Object.assign(this, {
      start: moment.duration(chronotype.start),
      end: moment.duration(chronotype.end)
    });

    if (this.minutes <= 0) {
      throw new Error("Cannot create a negative Chronotype");
    }
  }

  start: Duration = defaultChronotype.start;
  end: Duration = defaultChronotype.end;

  get minutes() {
    return Chronotype.getMinutes(this);
  }

  /**
   * The earliest available time within date according to the Chronotype
   */
  startOf(date: Date) {
    return Chronotype.getStartOf(date, this);
  }

  endOf(date: Date) {
    return Chronotype.getEndOf(date, this);
  }

  range(date: Date): DateRange {
    return {
      start: this.startOf(date),
      end: this.endOf(date)
    };
  }

  static getMinutes({ start, end }: IChronotype) {
    return end.asMinutes() - start.asMinutes();
  }

  static getStartOf(date: Date, { start }: IChronotype | { start: Duration }) {
    return moment(date)
      .startOf("day")
      .add(start)
      .toDate();
  }

  static getEndOf(date: Date, { end }: IChronotype | { end: Duration }) {
    return moment(date)
      .startOf("day")
      .add(end)
      .toDate();
  }

  static getRange(date: Date, { start, end }: IChronotype) {
    return {
      start: Chronotype.getStartOf(date, { start }),
      end: Chronotype.getEndOf(date, { end })
    };
  }
}
