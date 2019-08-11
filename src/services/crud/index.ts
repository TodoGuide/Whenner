import Id, { IdGenerator } from "../Id";
import { Time } from "../../models/time";

/**
 * A function that finds an item of the specified type, optionally from a provided arrary
 */
export interface Finder<T extends Id> {
  (id: number, list?: T[]): Promise<T | undefined>;
}

/**
 * A function that returns a Finder function for the specified Reader
 */
export interface FinderComposer {
  <T extends Id>(read: Reader<T[]>): Finder<T>;
}

export const readListfinder: FinderComposer = <T extends Id>(
  read: Reader<T[]>
): Finder<T> => {
  return async function(id: number, list?: T[]) {
    return (list || await read()).find(t => t.id === id);
  };
};

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

/**
 * A function that reads a value of the specified type from some storage location
 */
export interface Reader<T> {
  (): Promise<T>;
}

/**
 * A function that returns a Reader function for the specified key.
 */
export interface ReaderComposer {
  <T, A extends T[]>(key: string, defaultValue?: A): Reader<A>;
}

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
  async function(item: T): Promise<T> {
    return await update(item) || await insert(item);
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
  generateId = Time.now
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
    upsert: upserter(update, insert)
  };
}
