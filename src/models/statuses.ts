import Time, { Endable, isEndable } from "./time";
import { Completable, isCompletable } from "./completion";
import { dateValueOf, timeValueOf } from "./time/utils";
import Cancelable, { isCancelable } from "./cancelable";

export type Closable = Completable | Endable;

export function isClosable(candidate: any) {
  return isCompletable(candidate) || isEndable(candidate);
}

export type Statusable = Closable & Cancelable;

export function isStatusable(candidate: any) {
  return isClosable(candidate) && isCancelable(candidate);
}

/**
 * If the given event is a task, the completed date is returned. If the event is an appointment,
 * returns the appointment end date only if the end date is in the past.
 *
 * @export
 * @param {Event} closable
 * @returns {(Date | undefined)}
 */
export function closed(closable: Closable): Date | undefined {
  const result =
    dateValueOf((closable as Completable).completed) ||
    ((timeValueOf((closable as Endable).end) || 0) <= Time.now()
      ? (closable as Endable).end
      : undefined);

  return result && new Date(result);
}

export function isClosed(closable: Closable): boolean {
  return !!closed(closable);
}

export function isOpened(statusable: Statusable): boolean {
  return !isClosed(statusable) && !isCanceled(statusable);
}

export function isNotOpened(statusable: Statusable) {
  return !isOpened(statusable);
}

export function isCanceled(statusable: Statusable): boolean {
  return !!statusable.canceled;
}
