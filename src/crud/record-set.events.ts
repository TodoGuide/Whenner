import Identifiable from "../attribs/identifiable";
import RecordActor from "./record.actor";
import { RecordEventData } from "./record.events";

export type RefreshEvent = {
  type: "REFRESH";
};

export type RetryEvent = {
  type: "RETRY";
};

export type RecordIncludeEvent<T extends Identifiable> = {
  type: "INCLUDE_RECORD";
} & RecordEventData<T>;

export type RecordExcludeEvent<T extends Identifiable> = {
  type: "EXCLUDE_RECORD";
} & RecordEventData<T>;

export type RecordChangedEvent<T extends Identifiable> = {
  type: "RECORD_CHANGED";
} & RecordEventData<T>;

type RecordSetEvent<T extends Identifiable> =
  | RecordChangedEvent<T>
  | RecordIncludeEvent<T>
  | RecordExcludeEvent<T>
  | RefreshEvent
  | RetryEvent;

export type RecordsReadyEvent<T extends Identifiable> = {
  type: "RECORD_SET.RECORDS_READY";
} & { records: Array<RecordActor<T>> };

export default RecordSetEvent;
