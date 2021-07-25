import { assign, createMachine, DoneInvokeEvent, EventObject } from "xstate";
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

function createOperationSuccessConfig<T extends Id>() {
  return {
    target: "viewing",
    actions: createRecordAssigner<T>(),
  };
}

function createOperationInvoker<T extends Id>(operation: Operation<T>) {
  return (context: RecordContext<T>, event: RecordEvent<T>) =>
    operation({ ...context.record, ...event.record });
}

function createOperationInvokerConfig<T extends Id>(
  id: string,
  operation: Operation<T>
) {
  return {
    id,
    src: createOperationInvoker(operation),
    onDone: createOperationSuccessConfig<T>(),
    onError: createOperationErrorConfig(),
  };
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
          onDone: createOperationSuccessConfig<T>(),
          onError: createOperationErrorConfig(),
        },
      },
      saving: {
        invoke: createOperationInvokerConfig<T>("upsert", crud.upsert),
      },
      inserting: {
        invoke: createOperationInvokerConfig<T>("insert", crud.insert),
      },
      updating: {
        invoke: createOperationInvokerConfig<T>("update", crud.update),
      },
      error: {
        on: {
          ACKNOWLEDGE: {
            target: "viewing",
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

export interface RecordSetEvent<T extends Id> extends EventObject {
  records: T[];
}

export const createRecordSetMachine = <T extends Id>(crud: Crud<T>) =>
  createMachine<RecordSetContext<T>, RecordSetEvent<T>>({
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
              records: (context, event) => event.data,
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
