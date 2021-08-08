// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright (C) 2021  James Tharpe
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
import composeCrud from "..";

const buckets: Record<string, Array<any>> = {};

export const memoryInserter: InserterComposer = <T extends Id>(
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

export const memoryReader: ReaderComposer =
  <T>(key: string, defaultValue?: T): Reader<T> =>
  (): Promise<T> =>
    Promise.resolve((buckets[key] || defaultValue) as unknown as T) || [];

export const memoryUpdater: UpdaterComposer = <T extends Id>(
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

export const memoryWriter: WriterComposer = <T>(key: string) =>
  function (item: T): Promise<T> {
    buckets[key] = item as unknown as any[];
    return Promise.resolve(item);
  };

type MemoryCrudArgs<T extends Id> = {
  key: string;
  defaultData?: T[];
  generateId?: IdGenerator;
  composeRead?: ReaderComposer;
  composeWrite?: WriterComposer;
  composeFind?: FinderComposer;
  composeUpdate?: UpdaterComposer;
  composeInsert?: InserterComposer;
};

export const memoryCrud = <T extends Id>({
  key,
  defaultData,
  generateId,
  composeRead = memoryReader,
  composeWrite = memoryWriter,
  composeFind = readListFinder,
  composeUpdate = memoryUpdater,
  composeInsert = memoryInserter,
}: MemoryCrudArgs<T>) =>
  composeCrud({
    key,
    composeRead,
    composeWrite,
    composeFind,
    composeUpdate,
    composeInsert,
    defaultData: defaultData || [],
    generateId,
  });
