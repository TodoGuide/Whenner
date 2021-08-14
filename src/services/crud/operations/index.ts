import Identifiable from "../../Id";
import { Inserter } from "./insert";
import { Updater, Upserter } from "./update";

export type Operation<T extends Identifiable> =
  | Inserter<T>
  | Updater<T>
  | Upserter<T>;
