// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright (C) 2021 James Tharpe

import {
  ActorRef,
  assign,
  createMachine,
  DoneInvokeEvent,
  spawn,
  State,
} from "xstate";
import { Crud } from ".";
import Id from "../Id";
import {
  createOperationErrorConfig,
  createRecordMachine,
  RecordContext,
  RecordEvent,
} from "./record";

export type RecordActor<T extends Id> = T & {
  ref: ActorRef<RecordEvent<T>, State<RecordContext<T>, RecordEvent<T>>>;
};

export interface RecordSetContext<T extends Id> {
  records: RecordActor<T>[];
  error?: string;
}

export const createRecordSetMachine = <T extends Id>(
  crud: Crud<T>,
  type: string = "record"
) =>
  createMachine<RecordSetContext<T>, RecordEvent<T>>({
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
                    ref: spawn(createRecordMachine(record, crud, type)),
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
            actions: assign((context, event) => {
              const result = {
                records: context.records.map((record) =>
                  record.id === event.record.id
                    ? {
                        ...event.record,
                        ref: spawn(
                          createRecordMachine(event.record, crud, type)
                        ),
                      }
                    : record
                ),
              };
              return result;
            }),
          },
          INCLUDE_RECORD: {
            actions: assign((context, event) => {
              const result = {
                records: [
                  ...context.records,
                  {
                    ...event.record,
                    ref: spawn(createRecordMachine(event.record, crud, type)),
                  },
                ],
              };
              return result;
            }),
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
