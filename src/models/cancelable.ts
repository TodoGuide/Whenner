import { isDate } from "moment";

export default interface Cancelable {
  canceled: Date | null;
}

export function isCancelable(candidate: any) {
  const result =
    candidate.hasOwnProperty("canceled") &&
    (isDate(candidate.canceled) || typeof candidate.canceled === "undefined");
  console.log("isCancelable", { candidate, result });
  return result;
}
