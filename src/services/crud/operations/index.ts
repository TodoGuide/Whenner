import Id from "../../Id";
import { Inserter } from "./insert";
import { Updater, Upserter } from "./update";

export type Operation<T extends Id> = Inserter<T> | Updater<T> | Upserter<T>;
