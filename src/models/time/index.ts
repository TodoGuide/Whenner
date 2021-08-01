// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright (C) 2019  James Tharpe

import { MILLISECONDS_PER_DAY } from "./constants";

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
    new Date(new Date(date).setHours(0, 0, 0, 0) + MILLISECONDS_PER_DAY),
  yesterday: () => new Date(Time.today().getTime() - MILLISECONDS_PER_DAY),
  set: (to: Date) => {
    Time.current = () => new Date(to);
    Time.now = () => to.getTime();
    return Time.current();
  },
};

/**
 * A function that takes an object and returns a start date
 */
export interface Dater<T = {}> {
  (item: T): Date;
}

/**
 * The given set of objects, ordered by their date
 * @param dater The Dater function
 * @param items The items to order
 */
export function orderByDate<T>(dater: Dater<T>, ...items: T[]) {
  return items.sort((a, b) => dater(a).getTime() - dater(b).getTime());
}
