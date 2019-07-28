import { Dater, orderByDate } from ".";

export interface Start {
  readonly start: Date;
}

/**
 * Returns a start date the given Start object
 * @param item The item to have its start date determined
 */
export const startDater: Dater<Start> = (item) => item.start;

export function orderByStart<T extends Start>(...starts: T[]) {
  return orderByDate(startDater, ...starts);
}

