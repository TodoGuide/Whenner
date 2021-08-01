import Id, { IdGenerator } from "../../Id";
import { Finder, Reader } from "./retrieve";
import { Writer } from "./update";

/**
 * A function that inserts a value of the specified type into some location
 */
export interface Inserter<T extends Id> {
  (item: T): Promise<T>;
}

/**
 * A function that returns an Inserter function
 */
export interface InserterComposer {
  <T extends Id>(
    read: Reader<T[]>,
    write: Writer<T[]>,
    find: Finder<T>,
    nextId: IdGenerator
  ): Inserter<T>;
}
