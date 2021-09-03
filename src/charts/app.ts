import {
  AnyEventObject,
  assign,
  createMachine,
  send,
  spawn,
  StateMachine,
} from "xstate";
import {
  createEventRecordSetMachine,
  EventRecordActor,
  EventRecordSetActorRef,
  startPriorityOf,
} from "../models/Event";
import { Crud } from "../services/crud";
import { Event } from "../models/Event";
import { emptyTask } from "../models/Task";

export interface AppContext {
  events: EventRecordActor[];
  db: EventRecordSetActorRef;
}

export type AppMachine = StateMachine<AppContext, any, AnyEventObject>;

export const createAppMachine = (crud: Crud<Event>): AppMachine =>
  createMachine<AppContext>({
    id: "whenner-app",
    context: {
      events: [],
      db: {} as unknown as EventRecordSetActorRef,
    },
    initial: "loading",
    on: {
      RECORDS_READY: {
        target: "ready",
        actions: [
          (context, event) => console.log("RECORDS_READY", { context, event }),
          assign((_context, event) => ({ events: event.records })),
        ],
      },
    },
    states: {
      loading: {
        entry: assign((context) => ({
          db: spawn(createEventRecordSetMachine(crud)),
        })),
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
