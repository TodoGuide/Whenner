import {
  assign,
  createMachine,
  DoneInvokeEvent,
  EventObject,
  sendParent,
  spawn,
} from "xstate";
import { Crud, Operation } from ".";
import Id from "../Id";

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

function createOperationErrorConfig() {
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

export const createRecordMachine = <T extends Id>(record: T, crud: Crud<T>) =>
  createMachine<RecordContext<T>, RecordEvent<T>>({
    id: "record",
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

// ---

export interface RecordSetContext<T extends Id> {
  records: T[];
  error?: string;
}

export const createRecordSetMachine = <T extends Id>(crud: Crud<T>) =>
  createMachine<RecordSetContext<T>, RecordEvent<T>>({
    id: "record-set",
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
                    ref: spawn(createRecordMachine(record, crud)),
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
                  record.id === event.record.id ? event.record : record
                ),
              };
              return result;
            }),
          },
        },
      },
      error: {
        on: {
          ACKNOWLEDGE: {
            target: "ready",
          },
        },
      },
    },
  });
