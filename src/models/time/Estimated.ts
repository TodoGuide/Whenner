import { Start } from "./Start";
import { End } from "./End";

export interface Estimated {
  readonly estimate: number;
}

export type StartEstimated = Start & Estimated;
export type EndEstimated = End & Estimated;

export function estimated(item: any): Estimated | undefined {
  const { estimate = undefined } = item || {};
  if (estimate || (estimate === 0 && estimate instanceof Number)) {
    return item;
  }

  return undefined;
}
