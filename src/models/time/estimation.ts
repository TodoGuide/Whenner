// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright (C) 2019  James Tharpe

import { Startable, Endable, isStartable, isEndable } from ".";

export interface Estimable {
  readonly estimate: number;
}

export type StartEstimable = Startable & Estimable;
export type EndEstimable = Endable & Estimable;

export function isEstimable(candidate: any) {
  return (
    candidate.hasOwnProperty("estimate") &&
    typeof candidate.estimate === "number"
  );
}

export function isStartEstimable(candidate: any) {
  return isStartable(candidate) && isEstimable(candidate);
}

export function isEndEstimable(candidate: any) {
  return isEndable(candidate) && isEstimable(candidate);
}

export function estimated(item: any): Estimable | undefined {
  const { estimate = undefined } = item || {};
  return estimate || estimate === 0 ? item : undefined;
}
