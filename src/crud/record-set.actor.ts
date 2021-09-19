import { ActorRef, State } from "xstate";
import { Crud } from ".";
import Identifiable from "../attribs/identifiable";
import { RecordSetContext } from "./record-set.context";
import RecordSetEvent from "./record-set.events";

export type RecordSetActorRef<T extends Identifiable> = ActorRef<
  RecordSetEvent<T>,
  State<RecordSetContext<T>, RecordSetEvent<T>>
>;

type RecordSetActor<T extends Identifiable> = Crud<T> & {
  ref: RecordSetActorRef<T>;
};

export default RecordSetActor;
