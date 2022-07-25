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

export function asDate(value: unknown): Date | undefined {
	try {
		return new Date(value as string);
	} catch {
		return undefined;
	}
}

export function isDate(value: unknown): boolean {
	return !!asDate(value);
}

export interface Startable {
	readonly start: Date;
}

export function isStartable(candidate: unknown) {
	return (
		Object.prototype.hasOwnProperty.call(candidate, "start") &&
		isDate((candidate as Startable).start)
	);
}

export interface Endable {
	end: Date;
}

export function isEndable(candidate: unknown) {
	return (
		Object.prototype.hasOwnProperty.call(candidate, "end") &&
		isDate((candidate as Endable).end)
	);
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

export function addHour(toDate: Date) {
  return new Date(toDate.getTime() + MILLISECONDS_PER_HOUR);
}

export function add30Minutes(toDate: Date) {
  return new Date(toDate.getTime() + MILLISECONDS_PER_MINUTE * 30);
}

export function subtractHour(fromDate: Date) {
  return new Date(fromDate.getTime() - MILLISECONDS_PER_HOUR);
}

export function latestOf(...dates: Date[]) {
  return dates.reduce((date1, date2) => (date1 > date2 ? date1 : date2));
}

export function earliestOf(...dates: Date[]) {
  return dates.reduce((prev, current) => (current < prev ? current : prev));
}

export function dateValueOf(
  date?: Date | string | number | null
): Date | undefined {
  return date ? new Date(date) : undefined;
}

export function timeValueOf(
  date?: Date | string | number | null
): number | undefined {
  const dateValue = dateValueOf(date);
  return dateValue ? dateValue.getTime() : undefined;
}
