// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright (C) 2019  James Tharpe

/**
 * The given set of objects, ordered by their date
 * @param dater The Dater function
 * @param items The items to order
 */
function orderByDate<T>(
  dater: {
    (item: T): Date;
  },
  ...items: T[]
) {
  return items.sort((a, b) => dater(a).getTime() - dater(b).getTime());
}

export function asDate(value: any): Date | undefined {
  try {
    return new Date(value);
  } catch {
    return undefined;
  }
}

export function isDate(value: any): boolean {
  return !!asDate(value);
}

export interface Startable {
  readonly start: Date;
}

export function isStartable(candidate: any) {
  return candidate.hasOwnProperty("start") && isDate(candidate.start);
}

export interface Endable {
  end: Date;
}

export function isEndable(candidate: any) {
  return candidate.hasOwnProperty("end") && isDate(candidate.end);
}

/**
 * Use instead of Date for easy mocking in tests
 */
const Time = {
  current: () => new Date(),
  now: () => Date.now(),
  today: () => new Date(Time.current().setHours(0, 0, 0, 0)),
  tomorrow: () => new Date(Time.today().getTime() + MILLISECONDS_PER_DAY),
  dayAfterTomorrow: () =>
    new Date(Time.tomorrow().getTime() + MILLISECONDS_PER_DAY),
  dayAfter: (date: Date) =>
    new Date(new Date(date).setHours(0, 0, 0, 0) + MILLISECONDS_PER_DAY),
  yesterday: () => new Date(Time.today().getTime() - MILLISECONDS_PER_DAY),
  set: (to: Date) => {
    Time.current = () => new Date(to);
    Time.now = () => to.getTime();
    return Time.current();
  },
};

export default Time;

export const MILLISECONDS_PER_MINUTE = 60000;
export const MILLISECONDS_PER_HOUR = 3600000;
export const MILLISECONDS_PER_DAY = 86400000;

export function orderByStart<T extends Startable>(...starts: T[]) {
  return orderByDate(({ start }) => start, ...starts);
}
