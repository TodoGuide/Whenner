// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright (C) 2019  James Tharpe

import Id, { IdGenerator } from "../../Id";
import { Time } from "../../../models/time";
import {
  Finder,
  FinderComposer,
  Reader,
  ReaderComposer,
  readListFinder,
} from "../operations/retrieve";
import { Inserter, InserterComposer } from "../operations/insert";
import {
  Updater,
  UpdaterComposer,
  Writer,
  WriterComposer,
} from "../operations/update";
import composeCrud from "../";

export const localStorageInserter: InserterComposer = <T extends Id>(
  read: Reader<T[]>,
  write: Writer<T[]>,
  find: Finder<T> = readListFinder(read),
  nextId: IdGenerator = Time.now
): Inserter<T> =>
  async function (item: T): Promise<T> {
    const existing = await find(item.id);
    if (existing) {
      throw new Error(
        `Cannot insert item with ID ${item.id} because it already exists`
      );
    }
    const insertItem = { ...item, id: nextId() };
    const items = [...(await read()), insertItem];
    write(items);
    return insertItem;
  };

export const localStorageReader: ReaderComposer =
  <T>(key: string, defaultValue?: T): Reader<T> =>
  (): Promise<T> =>
    Promise.resolve(
      JSON.parse(localStorage.getItem(key) || "null") || defaultValue || []
    );

export const localStorageUpdater: UpdaterComposer = <T extends Id>(
  read: Reader<T[]>,
  write: Writer<T[]>,
  find: Finder<T> = readListFinder(read)
): Updater<T> =>
  async function (item: T): Promise<T | undefined> {
    const items = await read();
    const existing = await find(item.id, items);
    if (existing) {
      items[items.indexOf(existing)] = { ...item };
      write(items);
      return find(item.id);
    }
  };

export const localStorageWriter: WriterComposer = <T>(key: string) =>
  function (item: T): Promise<T> {
    // console.log("localStorageWriter", { item });
    localStorage.setItem(key, JSON.stringify(item));
    return Promise.resolve(item);
  };

type LocalStorageCrudArgs<T extends Id> = {
  key: string;
  defaultData?: T[];
  generateId?: IdGenerator;
  composeRead?: ReaderComposer;
  composeWrite?: WriterComposer;
  composeFind?: FinderComposer;
  composeUpdate?: UpdaterComposer;
  composeInsert?: InserterComposer;
};

export const localStorageCrud = <T extends Id>({
  key,
  defaultData,
  generateId,
  composeRead = localStorageReader,
  composeWrite = localStorageWriter,
  composeFind = readListFinder,
  composeUpdate = localStorageUpdater,
  composeInsert = localStorageInserter,
}: LocalStorageCrudArgs<T>) =>
  composeCrud({
    key,
    composeRead,
    composeWrite,
    composeFind,
    composeUpdate,
    composeInsert,
    defaultData,
    generateId,
  });
