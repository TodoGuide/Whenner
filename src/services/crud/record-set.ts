import { assign, createMachine, DoneInvokeEvent, spawn } from "xstate";
import { Crud } from ".";
import Id from "../Id";
import {
  createOperationErrorConfig,
  createRecordMachine,
  RecordEvent,
} from "./record";

export interface RecordSetContext<T extends Id> {
  records: T[];
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
