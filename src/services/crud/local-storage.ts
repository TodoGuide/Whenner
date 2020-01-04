// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright (C) 2019  James Tharpe

import composeCrud, {
  ReaderComposer,
  Reader,
  WriterComposer,
  Writer,
  Inserter,
  Finder,
  UpdaterComposer,
  Updater,
  InserterComposer,
  readListFinder,
  FinderComposer
} from ".";
import Id, { IdGenerator } from "../Id";
import { Time } from "../../models/time";

export const localStorageInserter: InserterComposer = <T extends Id>(
  read: Reader<T[]>,
  write: Writer<T[]>,
  find: Finder<T> = readListFinder(read),
  nextId: IdGenerator = Time.now
): Inserter<T> =>
  async function(item: T): Promise<T> {
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

export const localStorageReader: ReaderComposer = <T>(
  key: string,
  defaultValue?: T
): Reader<T> => (): Promise<T> =>
  JSON.parse(localStorage.getItem(key) || "null") || defaultValue;

export const localStorageUpdater: UpdaterComposer = <T extends Id>(
  read: Reader<T[]>,
  write: Writer<T[]>,
  find: Finder<T> = readListFinder(read)
): Updater<T> =>
  async function(item: T): Promise<T | undefined> {
    const items = await read();
    const existing = await find(item.id, items);
    if (existing) {
      items[items.indexOf(existing)] = { ...item };
      write(items);
      return find(item.id);
    }
  };

export const localStorageWriter: WriterComposer = <T>(key: string) =>
  function(item: T): Promise<T> {
    localStorage.setItem(key, JSON.stringify(item));
    return Promise.resolve(item);
  };

type LocalStorageCrudArgs<T extends Id> = {
  key: string;
  initialData?: T[];
  generateId?: IdGenerator;
  composeRead?: ReaderComposer;
  composeWrite?: WriterComposer;
  composeFind?: FinderComposer;
  composeUpdate?: UpdaterComposer;
  composeInsert?: InserterComposer;
};

export const localStorageCrud = <T extends Id>({
  key,
  initialData,
  generateId,
  composeRead: composeReader = localStorageReader,
  composeWrite: composeWriter = localStorageWriter,
  composeFind: composeFinder = readListFinder,
  composeUpdate = localStorageUpdater,
  composeInsert: composeInserter = localStorageInserter
}: LocalStorageCrudArgs<T>) =>
  composeCrud({
    key,
    composeRead: composeReader,
    composeWrite: composeWriter,
    composeFind: composeFinder,
    composeUpdate,
    composeInsert: composeInserter,
    defaultData: initialData,
    generateId
  });
