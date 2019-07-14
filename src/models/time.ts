const MILLISECONDS_PER_DAY = 86400000;

/**
 * Use instead of Date for easy mocking in tests
 */
export const Time = {
  current: () => new Date(),
  now: () => Date.now(),
  today: () => new Date(Time.current().setHours(0, 0, 0, 0)),
  tomorrow: () => new Date(Time.today().getTime() + MILLISECONDS_PER_DAY),
  dayAfterTomorrow: () =>
    new Date(Time.tomorrow().getTime() + MILLISECONDS_PER_DAY),
  dayAfter: (date: Date) =>
    new Date(date.setHours(0, 0, 0, 0) + MILLISECONDS_PER_DAY),

  earliest: (...dates: Date[]) =>
    dates.reduce((prev, current) => (current < prev ? current : prev)),
  latest: (...dates: Date[]) =>
    dates.reduce((prev, current) => (current > prev ? current : prev)),

  set: (to: Date) => {
    Time.current = () => new Date(to);
    Time.now = () => to.getTime();
  }
};

export interface Start {
  start: Date;
}

export interface End {
  end: Date;
}

export interface Estimated {
  estimate: number;
}

export type StartEstimated = Start & Estimated;
export type EndEstimated = End & Estimated;
export type Period = Start & End;
