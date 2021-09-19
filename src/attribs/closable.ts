import Time, { dateValueOf, Endable, isEndable, timeValueOf } from "../time";
import { Completable, isCompletable } from "./completable";

export type Closable = Completable | Endable;

export function isClosable(candidate: any) {
  return isCompletable(candidate) || isEndable(candidate);
}

/**
 * If the given event is a task, the completed date is returned. If the event is an appointment,
 * returns the appointment end date only if the end date is in the past.
 *
 * @export
 * @param {Event} closable
 * @returns {(Date | undefined)}
 */
export function closed(closable: Partial<Closable>): Date | undefined {
  const result =
    dateValueOf((closable as Completable).completed) ||
    ((timeValueOf((closable as Endable).end) || 0) <= Time.now()
      ? (closable as Endable).end
      : undefined);

  return result && new Date(result);
}

export function isClosed(closable: Partial<Closable>): boolean {
  return !!closed(closable);
}
