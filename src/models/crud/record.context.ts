import Identifiable from "../attribs/identifiable";

export default interface RecordContext<T extends Identifiable> {
  record: T;
  internalId: number;
  error?: string;
}
