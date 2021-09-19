// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright (C) 2019  James Tharpe

import Identifiable, { IdGenerator } from "../../attribs/identifiable";
import { Finder, Retriever } from "./retrieve";
import { Writer } from "./update";

/**
 * An Inserter function inserts a value of the specified type into some location
 */
export interface Creator<T extends Identifiable> {
  (item: T): Promise<T>;
}

/**
 * A CreatorComposer function composes the provided functions into an Inserter function
 */
export interface CreatorComposer {
  <T extends Identifiable>(
    read: Retriever<T[]>,
    write: Writer<T[]>,
    find: Finder<T>,
    nextId: IdGenerator
  ): Creator<T>;
}
