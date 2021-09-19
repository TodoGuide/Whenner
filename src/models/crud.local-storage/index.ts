// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright © 2021  James Tharpe

import {
  Finder,
  FinderComposer,
  Retriever,
  RetrieverComposer,
  readListFinder,
} from "../crud/operations/retrieve";
import { Creator, CreatorComposer } from "../crud/operations/create";
import {
  Updater,
  UpdaterComposer,
  Writer,
  WriterComposer,
} from "../crud/operations/update";
import composeCrud from "../crud";
import Time from "../time";
import Identifiable, { IdGenerator } from "../attribs/identifiable";

export const localStorageInserter: CreatorComposer = <T extends Identifiable>(
  read: Retriever<T[]>,
  write: Writer<T[]>,
  find: Finder<T> = readListFinder(read),
  nextId: IdGenerator = Time.now
): Creator<T> =>
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

export const localStorageReader: RetrieverComposer =
  <T>(key: string, defaultValue?: T): Retriever<T> =>
  (): Promise<T> =>
    Promise.resolve(
      JSON.parse(localStorage.getItem(key) || "null") || defaultValue || []
    );

export const localStorageUpdater: UpdaterComposer = <T extends Identifiable>(
  read: Retriever<T[]>,
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

type LocalStorageCrudArgs<T extends Identifiable> = {
  key: string;
  defaultData?: T[];
  generateId?: IdGenerator;
  composeRead?: RetrieverComposer;
  composeWrite?: WriterComposer;
  composeFind?: FinderComposer;
  composeUpdate?: UpdaterComposer;
  composeInsert?: CreatorComposer;
};

export const localStorageCrud = <T extends Identifiable>({
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
