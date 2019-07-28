import { Start } from "./Start";
import { End } from "./End";

export type Period = Start & End;

export function period(item: any): Period | undefined {
  const { start = undefined, end = undefined } = item || {};
  if (start instanceof Date && end instanceof Date) {
    return item;
  }
  return undefined;
}

export function periodsOverlap(period1: Period, period2: Period) {
  return (
    (period1.start < period2.start && period1.end > period2.start) ||
    (period1.start > period2.start && period1.start < period2.end)
  );
}
