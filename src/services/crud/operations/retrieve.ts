// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright (C) 2021  James Tharpe
import Id from "../../Id";

/**
 * A function that finds an item of the specified type, optionally from a provided array
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

/**
 * A function that returns a Finder function to search a list
 * @param read The read function that returns all candidate records
 * @returns A function that finds the item in the given Reader
 */
export const readListFinder: FinderComposer = <T extends Id>(
  read: Reader<T[]>
): Finder<T> => {
  return async function (id: number, list?: T[]) {
    return (list || (await read()))?.find((t) => t.id === id);
  };
};

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
