import Identifiable from "../../models/attributes/identifiable";
import RecordActor from "./actor";

export interface RecordEventData<T extends Identifiable> {
  record: T | RecordActor<T>;
  internalId?: number;
}

export type RecordChangeEvent<T extends Identifiable> = {
  type: "CHANGE";
} & RecordEventData<T>;

export type RecordRefreshEvent<T extends Identifiable> = {
  type: "REFRESH";
} & RecordEventData<T>;

export type RecordCancelEvent<T extends Identifiable> = {
  type: "CANCEL";
} & RecordEventData<T>;

export type RecordSaveEvent<T extends Identifiable> = {
  type: "SAVE";
} & RecordEventData<T>;

export type RecordInsertEvent<T extends Identifiable> = {
  type: "INSERT";
} & RecordEventData<T>;

export type RecordUpdateEvent<T extends Identifiable> = {
  type: "UPDATE";
} & RecordEventData<T>;

export type RecordAcknowledgeEvent<T extends Identifiable> = {
  type: "ACKNOWLEDGE";
} & RecordEventData<T>;

type RecordEvent<T extends Identifiable> =
  | RecordChangeEvent<T>
  | RecordRefreshEvent<T>
  | RecordCancelEvent<T>
  | RecordSaveEvent<T>
  | RecordInsertEvent<T>
  | RecordUpdateEvent<T>
  | RecordAcknowledgeEvent<T>;

export default RecordEvent;
