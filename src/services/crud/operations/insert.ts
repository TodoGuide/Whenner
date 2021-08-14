// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright (C) 2019  James Tharpe

import Identifiable, { IdGenerator } from "../../Id";
import { Finder, Reader } from "./retrieve";
import { Writer } from "./update";

/**
 * An Inserter function inserts a value of the specified type into some location
 */
export interface Inserter<T extends Identifiable> {
  (item: T): Promise<T>;
}

/**
 * An InserterComposer function composes the provided functions into an Inserter function
 */
export interface InserterComposer {
  <T extends Identifiable>(
    read: Reader<T[]>,
    write: Writer<T[]>,
    find: Finder<T>,
    nextId: IdGenerator
  ): Inserter<T>;
}
