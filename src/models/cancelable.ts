import { isDate } from "moment";

export default interface Cancelable {
  canceled?: Date;
}

export function isCancelable(candidate: any) {
  return (
    candidate.hasOwnProperty("canceled") &&
    (isDate(candidate.canceled) || typeof candidate.canceled === "undefined")
  );
}
