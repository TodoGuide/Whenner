// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright (C) 2021  James Tharpe

import {
  assign,
  createMachine,
  DoneInvokeEvent,
  sendParent,
  StateMachine,
} from "xstate";
import { Crud } from "..";
import Identifiable from "../../attribs/identifiable";
import Operation from "../operation";
import RecordContext from "./context";
import RecordEvent from "./events";

function createRecordAssigner<T extends Identifiable>() {
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

function createOperationInvoker<T extends Identifiable>(
  operation: Operation<T>
) {
  return (context: RecordContext<T>, event: RecordEvent<T>) =>
    operation({ ...context.record, ...event.record });
}

export type RecordMachine<T extends Identifiable> = StateMachine<
  RecordContext<T>,
  any,
  RecordEvent<T>
>;

export const createRecordMachine = <T extends Identifiable>(
  record: T,
  internalId: number,
  crud: Crud<T>,
  type: string = "record"
): RecordMachine<T> =>
  createMachine<RecordContext<T>, RecordEvent<T>>({
    id: `${type}_${record.id}`,
    initial: "unmodified",
    context: { record, internalId },
    states: {
      unmodified: {
        on: {
          CHANGE: {
            actions: assign({ record: (_, event) => event.record }),
            target: "modified",
          },
          REFRESH: {
            target: "refreshing",
          },
        },
      },
      modified: {
        on: {
          CHANGE: {
            actions: assign({ record: (_, event) => event.record }), // TODO: De-dupe
            target: "modified",
          },
          CANCEL: {
            target: "refreshing",
          },
          SAVE: {
            target: "saving",
          },
          INSERT: {
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
            target: "unmodified",
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
            target: "unmodified",
            actions: [
              createRecordAssigner<T>(),
              sendParent((context) => ({
                type: "RECORD_CHANGED",
                record: context.record,
                internalId: context.internalId,
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
            target: "unmodified",
            actions: [
              createRecordAssigner<T>(),
              sendParent((context) => ({
                type: "RECORD_CHANGE",
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
            target: "unmodified",
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
            target: "unmodified",
            // todo: Clear context.error
          },
        },
      },
    },
  });
