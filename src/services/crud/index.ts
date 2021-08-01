// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright (C) 2019 James Tharpe

import Id, { IdGenerator } from "../Id";
import { Time } from "../../models/time";
import {
  Finder,
  FinderComposer,
  Reader,
  ReaderComposer,
} from "./operations/retrieve";
import { Inserter, InserterComposer } from "./operations/insert";
import {
  Updater,
  UpdaterComposer,
  upserter,
  Upserter,
  WriterComposer,
} from "./operations/update";

export interface Crud<T extends Id> {
  read: Reader<T[]>;
  find: Finder<T>;
  insert: Inserter<T>;
  update: Updater<T>;
  upsert: Upserter<T>;
}

type ComposeCrudArgs<T extends Id> = {
  key: string;
  composeRead: ReaderComposer;
  composeWrite: WriterComposer;
  composeFind: FinderComposer;
  composeUpdate: UpdaterComposer;
  composeInsert: InserterComposer;
  defaultData?: T[];
  generateId?: IdGenerator;
};

export default function composeCrud<T extends Id>({
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

  return {
    read,
    find: composeFind(read),
    insert,
    update,
    upsert: upserter(update, insert),
  };
}
