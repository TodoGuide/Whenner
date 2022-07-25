import { assign, createMachine, send, spawn, StateMachine } from "xstate";
import { emptyTask } from "./task";
import { Crud } from "../crud";
import { RecordsReadyEvent } from "../crud/record-set/events";
import Event, {
  createEventRecordSetMachine,
  EventRecordActor,
  EventRecordSetActorRef,
  startPriorityOf,
} from "./event";

export interface WhennerContext {
  events: EventRecordActor[];
  db: EventRecordSetActorRef;
}

type NewTaskEvent = {
  type: "NEW_TASK";
};

export type WhennerEvent = RecordsReadyEvent<Event> | NewTaskEvent;

export type WhennerMachine = StateMachine<WhennerContext, any, WhennerEvent>;

export const createWhennerMachine = (crud: Crud<Event>) => {
  const result: WhennerMachine = createMachine<WhennerContext, WhennerEvent>({
    id: "whenner-app",
    context: {
      events: [],
      db: {} as EventRecordSetActorRef,
    },
    initial: "loading",
    on: {
      "RECORD_SET.RECORDS_READY": {
        target: "ready",
        actions: [
          (context, event) => console.log("RECORDS_READY", { context, event }),
          assign({ events: (_, event) => event.records }),
        ],
      },
    },
    states: {
      loading: {
        entry: assign((context) => {
          return {
            ...context,
            db: spawn(
              createEventRecordSetMachine(crud)
            ) as EventRecordSetActorRef,
          };
        }),
      },
      ready: {
        on: {
          NEW_TASK: {
            actions: [
              (context, event) => console.log("NEW_TASK", { context, event }),
              send(
                (context) => ({
                  type: "INCLUDE_RECORD",
                  record: {
                    ...emptyTask,
                    priority:
                      Math.min(
                        0,
                        ...context.events.map((event) => startPriorityOf(event))
                      ) - 1,
                  },
                }),
                { to: (context) => context.db }
              ),
            ],
          },
        },
      },
    },
  });
  return result;
};
