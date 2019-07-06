/**
 * Use instead of Date for easy mocking in tests
 */
export const Time = {
  current: () => new Date(),
  now: () => Date.now(),
  today: () => new Date(Time.current().setHours(0, 0, 0, 0)),
  tomorrow: () => new Date(Time.today().getTime() + 24 * 60 * 60 * 1000),
  dayAfterTomorrow: () => new Date(Time.tomorrow().getTime() + 24 * 60 * 60 * 1000),

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

export interface Estimate {
    estimate: number;
}

export type Estimated = Start & Estimate;
export type Period = Start & End;