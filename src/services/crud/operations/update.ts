import Id from "../../Id";
import { Inserter } from "./insert";
import { Finder, Reader } from "./retrieve";

export interface Updater<T extends Id> {
  (item: T): Promise<T | undefined>;
}

export interface UpdaterComposer {
  <T extends Id>(
    read: Reader<T[]>,
    write: Writer<T[]>,
    find: Finder<T>
  ): Updater<T>;
}

export interface UpserterComposer {
  <T extends Id>(update: Updater<T>, insert: Inserter<T>): Upserter<T>;
}

/**
 * A function that upserts a value of the specified type to some storage location
 */
export interface Upserter<T extends Id> {
  (item: T): Promise<T>;
}

/**
 * Updates or inserts a value as appropriate in a storage location
 * @param update The Updater function to use for modifications
 * @param insert The Inserter function to use for creates
 */
export const upserter: UpserterComposer = <T extends Id>(
  update: Updater<T>,
  insert: Inserter<T>
): Upserter<T> =>
  async function (item: T): Promise<T> {
    return (await update(item)) || (await insert(item));
  };

/**
 * A function that writes a value of the specified type to some storage location
 */
export interface Writer<T> {
  (item: T): Promise<T>;
}

/**
 * A function that returns a Writer function for the specified key.
 */
export interface WriterComposer {
  <T>(key: string): Writer<T>;
}
