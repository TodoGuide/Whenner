import Identifiable from "../models/attributes/identifiable";
import { Creator } from "./create";
import { Updater, Upserter } from "./update";

type Operation<T extends Identifiable> = Creator<T> | Updater<T> | Upserter<T>;

export default Operation;
