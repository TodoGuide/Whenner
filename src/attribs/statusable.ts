import Cancelable, { isCancelable, isCanceled } from "./cancelable";
import { Closable, isClosable, isClosed } from "./closable";

export type Statusable = Closable & Cancelable;

export function isStatusable(candidate: any) {
  return isClosable(candidate) && isCancelable(candidate);
}

export function isOpened(statusable: Partial<Statusable>): boolean {
  return !isClosed(statusable) && !isCanceled(statusable);
}

export function isNotOpened(statusable: Partial<Statusable>) {
  return !isOpened(statusable);
}
