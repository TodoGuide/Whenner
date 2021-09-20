// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright (C) 2019 James Tharpe

import Identifiable, { IdGenerator } from "../attribs/identifiable";
import Time from "../time";
import {
  Finder,
  FinderComposer,
  Retriever,
  RetrieverComposer,
} from "./retrieve";
import { Creator, CreatorComposer } from "./create";
import {
  Updater,
  UpdaterComposer,
  upserter,
  Upserter,
  WriterComposer,
} from "./update";
import { ActorRef, EventObject, State } from "xstate";
import RecordContext from "./record/context";
import RecordEvent from "./record/events";

export interface Crud<T extends Identifiable> {
  read: Retriever<T[]>;
  find: Finder<T>;
  insert: Creator<T>;
  update: Updater<T>;
  upsert: Upserter<T>;
}

export type CrudActor<T extends Identifiable> = Crud<T> & {
  ref: ActorRef<EventObject, State<RecordContext<T>, RecordEvent<T>>>;
};

type ComposeCrudArgs<T extends Identifiable> = {
  key: string;
  composeRead: RetrieverComposer;
  composeWrite: WriterComposer;
  composeFind: FinderComposer;
  composeUpdate: UpdaterComposer;
  composeInsert: CreatorComposer;
  defaultData?: T[];
  generateId?: IdGenerator;
};

export default function composeCrud<T extends Identifiable>({
  key,
  composeRead,
  composeWrite,
  composeFind,
  composeUpdate,
  composeInsert,
  defaultData,
  generateId = Time.now,
}: ComposeCrudArgs<T>): Crud<T> {
  const read = composeRead(key, defaultData);
  const find = composeFind(read);
  const write = composeWrite<T[]>(key);
  const insert = composeInsert(read, write, find, generateId);
  const update = composeUpdate(read, write, find);
  const upsert = upserter(update, insert);

  return {
    read,
    find,
    insert,
    update,
    upsert,
  };
}
