// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright © 2021  James Tharpe

import Identifiable from "../models/attributes/identifiable";

/**
 * A Finder finds an item of the specified type in a data source, or from the provided array if specified
 */
export interface Finder<T extends Identifiable> {
  (id: number, list?: T[]): Promise<T | undefined>;
}

/**
 * A FinderComposer function composes a Finder function from the specified Reader function
 */
export interface FinderComposer {
  <T extends Identifiable>(read: Retriever<T[]>): Finder<T>;
}

/**
 * A FinderComposer function that returns a Finder function to search a list
 * @param read The read function that returns all candidate records
 * @returns A function that finds the item in the given Reader
 */
export const readListFinder: FinderComposer = <T extends Identifiable>(
  read: Retriever<T[]>
): Finder<T> => {
  return async function (id: number, list?: T[]) {
    return (list || (await read()))?.find((t) => t.id === id);
  };
};

/**
 * A Reader function reads a value of the specified type from some storage location
 */
export interface Retriever<T> {
  (): Promise<T>;
}

/**
 * A RetrieverComposer function composes a Reader function for the specified key, which acts as a table, bucket, or other name for a data container.
 */
export interface RetrieverComposer {
  <T, A extends T[]>(key: string, defaultValue?: A): Retriever<A>;
}
