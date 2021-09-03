// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright © 2021 James Tharpe

import {
  ActorRef,
  assign,
  createMachine,
  DoneInvokeEvent,
  sendParent,
  spawn,
  State,
  StateMachine,
} from "xstate";
import { Crud } from ".";
import Id from "../Id";
import {
  createOperationErrorConfig,
  createRecordMachine,
  RecordActor,
  RecordEvent,
} from "./record";

let nextInternalId = -10_000;

export interface RecordSetContext<T extends Id> {
  records: RecordActor<T>[];
  error?: string;
}

export type RecordSetActorRef<T extends Id> = ActorRef<
  RecordEvent<T>,
  State<RecordSetContext<T>, RecordEvent<T>>
>;

export type RecordSetActor<T extends Id> = Crud<T> & {
  ref: RecordSetActorRef<T>;
};

export type RecordSetMachine<T extends Id> = StateMachine<
  RecordSetContext<T>,
  any,
  RecordEvent<T>
>;

export const createRecordSetMachine = <T extends Id>(
  crud: Crud<T>,
  type: string = "record"
): RecordSetMachine<T> => {
  return createMachine<RecordSetContext<T>, RecordEvent<T>>({
    id: `${type}-set`,
    initial: "loading",
    context: {
      records: [],
    },
    states: {
      loading: {
        invoke: {
          id: "loading",
          src: crud.read,
          onDone: {
            target: "ready",
            actions: assign({
              records: (_context, event: DoneInvokeEvent<T[]>) =>
                event.data.map((record) => {
                  return {
                    ...record,
                    internalId: nextInternalId++,
                    ref: spawn(
                      createRecordMachine(record, nextInternalId++, crud, type)
                    ),
                  };
                }),
            }),
          },
          onError: createOperationErrorConfig(),
        },
      },
      ready: {
        on: {
          REFRESH: {
            target: "loading",
          },
          RECORD_CHANGED: {
            actions: [
              assign((context, event) => {
                const result = {
                  records: context.records.map((record) =>
                    record.internalId === event.internalId
                      ? {
                          ...event.record,
                          internalId: event.internalId,
                          ref: spawn(
                            createRecordMachine(
                              event.record,
                              event.internalId,
                              crud,
                              type
                            )
                          ),
                        }
                      : record
                  ),
                };
                return result;
              }),
              sendParent((context) => ({
                // TODO: Use `entry` actions - they won't fire for some reason
                type: "RECORDS_READY",
                records: context.records,
              })),
            ],
          },
          INCLUDE_RECORD: {
            actions: [
              (context, event) =>
                console.log("INCLUDE_RECORD", { context, event }),
              assign((context, event) => {
                const internalId = nextInternalId++;
                const result = {
                  records: [
                    ...context.records,
                    {
                      ...event.record,
                      internalId,
                      ref: spawn(
                        createRecordMachine(
                          event.record,
                          internalId,
                          crud,
                          type
                        )
                      ),
                    },
                  ],
                };
                return result;
              }),
              sendParent((context) => ({
                // TODO: Use `entry` actions - they won't fire for some reason
                type: "RECORDS_READY",
                records: context.records,
              })),
            ],
          },
          EXCLUDE_RECORD: {
            actions: assign((context, event) => {
              const result = {
                records: context.records.filter(
                  (record) => record.id === event.record.id
                ),
              };
              return result;
            }),
          },
        },
        entry: [
          (context, event) => console.log("ready entry", { context, event }),
          sendParent((context) => ({
            type: "RECORDS_READY",
            records: context.records,
          })),
        ],
      },
      error: {
        on: {
          RETRY: {
            target: "loading",
          },
        },
      },
    },
  });
};
