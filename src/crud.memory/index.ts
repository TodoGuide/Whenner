// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright © 2021  James Tharpe

import composeCrud from "../crud";
import { Creator, CreatorComposer } from "../crud/create";
import {
  Finder,
  FinderComposer,
  Retriever,
  RetrieverComposer,
  readListFinder,
} from "../crud/retrieve";
import {
  Updater,
  UpdaterComposer,
  Writer,
  WriterComposer,
} from "../crud/update";
import Identifiable, { IdGenerator } from "../models/attributes/identifiable";
import Time from "../models/time";

const buckets: Record<string, Array<any>> = {};

export const memoryInserter: CreatorComposer = <T extends Identifiable>(
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

export const memoryReader: RetrieverComposer =
  <T>(key: string, defaultValue?: T): Retriever<T> =>
  (): Promise<T> =>
    Promise.resolve((buckets[key] || defaultValue) as unknown as T) || [];

export const memoryUpdater: UpdaterComposer = <T extends Identifiable>(
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

export const memoryWriter: WriterComposer = <T>(key: string) =>
  function (item: T): Promise<T> {
    buckets[key] = item as unknown as any[];
    return Promise.resolve(item);
  };

type MemoryCrudArgs<T extends Identifiable> = {
  key: string;
  defaultData?: T[];
  generateId?: IdGenerator;
  composeRead?: RetrieverComposer;
  composeWrite?: WriterComposer;
  composeFind?: FinderComposer;
  composeUpdate?: UpdaterComposer;
  composeInsert?: CreatorComposer;
};

export const memoryCrud = <T extends Identifiable>({
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
