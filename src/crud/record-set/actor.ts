import { ActorRef, State } from "xstate";
import { Crud } from "..";
import Identifiable from "../../models/attributes/identifiable";
import { RecordSetContext } from "./context";
import RecordSetEvent from "./events";

export type RecordSetActorRef<T extends Identifiable> = ActorRef<
  RecordSetEvent<T>,
  State<RecordSetContext<T>, RecordSetEvent<T>>
>;

type RecordSetActor<T extends Identifiable> = Crud<T> & {
  ref: RecordSetActorRef<T>;
};

export default RecordSetActor;
