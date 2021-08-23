// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright (C) 2019  James Tharpe

import { MILLISECONDS_PER_HOUR, MILLISECONDS_PER_MINUTE } from ".";

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
