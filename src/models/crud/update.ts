import Identifiable from "../attribs/identifiable";
import { Creator } from "./create";
import { Finder, Retriever } from "./retrieve";

/**
 * An Updater function updates a record in a data store with the passed in value
 *
 * @export
 * @interface Updater
 * @template T - The type of object contained within the data store
 */
export interface Updater<T extends Identifiable> {
  (item: T): Promise<T | undefined>;
}

/**
 * An UpdateComposer function composes an Updater function from the provided read, write, and find functions
 *
 * @export
 * @interface UpdaterComposer
 */
export interface UpdaterComposer {
  <T extends Identifiable>(
    read: Retriever<T[]>,
    write: Writer<T[]>,
    find: Finder<T>
  ): Updater<T>;
}

/**
 * An UpserterComposer function composes an Upserter function from the provided update and insert functions
 *
 * @export
 * @interface UpserterComposer
 */
export interface UpserterComposer {
  <T extends Identifiable>(update: Updater<T>, insert: Creator<T>): Upserter<T>;
}

/**
 * A function that upserts a value of the specified type to some storage location
 */
export interface Upserter<T extends Identifiable> {
  (item: T): Promise<T>;
}

/**
 * Updates or inserts a value as appropriate in a storage location
 * @param update The Updater function to use for modifications
 * @param insert The Inserter function to use for creates
 */
export const upserter: UpserterComposer = <T extends Identifiable>(
  update: Updater<T>,
  insert: Creator<T>
): Upserter<T> =>
  async function (item: T): Promise<T> {
    const result = (await update(item)) || (await insert(item));
    console.log("upserter called", { result });
    return result;
  };

/**
 * A Writer function writes a value of the specified type to a data store
 */
export interface Writer<T> {
  (item: T): Promise<T>;
}

/**
 * A WriterComposer function composes Writer function for the specified key. They key identifies
 * the "container" for the data, such as a table or bucket.
 */
export interface WriterComposer {
  <T>(key: string): Writer<T>;
}
