import { ActorRef, State } from "xstate";
import Identifiable from "../../attribs/identifiable";
import RecordContext from "./context";
import RecordEvent from "./events";

type RecordActorRef<T extends Identifiable> = ActorRef<
  RecordEvent<T>,
  State<RecordContext<T>, RecordEvent<T>>
>;

type RecordActor<T extends Identifiable> = T & {
  ref: RecordActorRef<T>;
  internalId: number;
};

export default RecordActor;
