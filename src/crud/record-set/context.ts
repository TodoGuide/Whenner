import Identifiable from "../../models/attributes/identifiable";
import RecordActor from "../record/actor";

export interface RecordSetContext<T extends Identifiable> {
  records: Array<RecordActor<T>>;
  error?: string;
}
