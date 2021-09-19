import Identifiable from "../Id";

export default interface RecordContext<T extends Identifiable> {
  record: T;
  internalId: number;
  error?: string;
}
