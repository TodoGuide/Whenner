import Identifiable from "../../attribs/identifiable";
import RecordActor from "../record/actor";

export interface RecordSetContext<T extends Identifiable> {
  records: Array<RecordActor<T>>;
  error?: string;
}
