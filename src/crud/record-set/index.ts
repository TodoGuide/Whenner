// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright © 2021 James Tharpe

import {
  assign,
  createMachine,
  DoneInvokeEvent,
  sendParent,
  spawn,
  StateMachine,
} from "xstate";
import { Crud } from "..";
import Identifiable from "../../models/attributes/identifiable";
import Id from "../../models/attributes/identifiable";
import { createOperationErrorConfig, createRecordMachine } from "../record";
import { RecordSetContext } from "./context";
import RecordSetEvent from "./events";

let nextInternalId = -10_000;

export type RecordSetMachine<T extends Id> = StateMachine<
  RecordSetContext<T>,
  any,
  RecordSetEvent<T>
>;

export const createRecordSetMachine = <T extends Identifiable>(
  crud: Crud<T>,
  type: string = "record"
): RecordSetMachine<T> => {
  const result = createMachine<RecordSetContext<T>, RecordSetEvent<T>>({
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
                type: "RECORD_SET.RECORDS_READY",
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
                type: "RECORD_SET.RECORDS_READY",
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
            type: "RECORD_SET.RECORDS_READY",
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
  return result;
};
