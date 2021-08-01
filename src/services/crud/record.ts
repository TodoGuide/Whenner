// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright (C) 2021  James Tharpe

import {
  assign,
  createMachine,
  DoneInvokeEvent,
  EventObject,
  sendParent,
} from "xstate";
import { Crud } from ".";
import Id from "../Id";
import { Operation } from "./operations";

export interface RecordContext<T extends Id> {
  record: T;
  error?: string;
}

export interface RecordEvent<T extends Id> extends EventObject {
  record: T;
}

function createRecordAssigner<T extends Id>() {
  return assign<RecordContext<T>, DoneInvokeEvent<T>>({
    record: (context, event) => ({ ...context.record, ...event.data }),
  });
}

export function createOperationErrorConfig() {
  return {
    target: "error",
    actions: assign<any, DoneInvokeEvent<any>>({
      error: (_context: unknown, event: DoneInvokeEvent<any>) => event.data,
    }),
  };
}

function createOperationInvoker<T extends Id>(operation: Operation<T>) {
  return (context: RecordContext<T>, event: RecordEvent<T>) =>
    operation({ ...context.record, ...event.record });
}

export const createRecordMachine = <T extends Id>(
  record: T,
  crud: Crud<T>,
  type: string = "record"
) =>
  createMachine<RecordContext<T>, RecordEvent<T>>({
    id: `${type}_${record.id}`,
    initial: "viewing",
    context: { record },
    states: {
      viewing: {
        on: {
          REFRESH: {
            target: "refreshing",
          },
          SAVE: {
            target: "saving",
          },
          INERT: {
            target: "inserting",
          },
          UPDATE: {
            target: "updating",
          },
        },
      },
      refreshing: {
        invoke: {
          id: "find",
          src: (context, event) =>
            crud.find(context.record.id || event.record.id),
          onDone: {
            target: "viewing",
            actions: [
              createRecordAssigner<T>(),
              sendParent((context) => ({
                type: "RECORD_CHANGED",
                record: context.record,
              })),
            ],
          },
          onError: createOperationErrorConfig(),
        },
      },
      saving: {
        invoke: {
          id: "upsert",
          src: createOperationInvoker(crud.upsert),
          onDone: {
            target: "viewing",
            actions: [
              createRecordAssigner<T>(),
              sendParent((context) => ({
                type: "RECORD_CHANGED",
                record: context.record,
              })),
            ],
          },
          onError: createOperationErrorConfig(),
        },
      },
      inserting: {
        invoke: {
          id: "insert",
          src: createOperationInvoker(crud.insert),
          onDone: {
            target: "viewing",
            actions: [
              createRecordAssigner<T>(),
              sendParent((context) => ({
                type: "RECORD_CHANGED",
                record: context.record,
              })),
            ],
          },
          onError: createOperationErrorConfig(),
        },
      },
      updating: {
        invoke: {
          id: "update",
          src: createOperationInvoker(crud.update),
          onDone: {
            target: "viewing",
            actions: [
              createRecordAssigner<T>(),
              sendParent((context) => ({
                type: "RECORD_CHANGED",
                record: context.record,
              })),
            ],
          },
          onError: createOperationErrorConfig(),
        },
      },
      error: {
        on: {
          ACKNOWLEDGE: {
            target: "viewing",
            // todo: Clear context.error
          },
        },
      },
    },
  });
