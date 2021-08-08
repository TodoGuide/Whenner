// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright (C) 2019  James Tharpe

import { Estimated } from "./time/Estimated";
import { Todo } from "./Todo";
import {
  Priority,
  sortByPriority as defaultPrioritize,
  prioritizer,
} from "./Priority";
import { Period } from "./time/Period";
import moment from "moment";
import { Time } from "./time";
import { ActorRef, assign, createMachine, State } from "xstate";
import { Upserter } from "../services/crud/operations/update";
import { RecordActor } from "../services/crud/record-set";
import { RecordContext, RecordEvent } from "../services/crud/record";

/**
 * A prioritized, estimated to-do with flexible start and end times.
 *
 * @export
 * @interface Task
 * @extends {Todo}
 * @extends {Priority}
 * @extends {Estimated}
 */
export interface Task extends Todo, Priority, Estimated {
  readonly predecessorIds?: number[];
  readonly supertaskId?: number;
}

export type TaskRecord = RecordActor<Task>;
export type TaskActorRef = ActorRef<
  RecordEvent<Task>,
  State<RecordContext<Task>, RecordEvent<Task>>
>;

export const taskPrioritizer = prioritizer;

export function prioritize<T extends Task>(tasks: T[]) {
  return defaultPrioritize(taskPrioritizer, ...tasks);
}

export function estimatedStartOf(task?: Task): Date {
  return new Date(task?.priority || Time.now());
}

export function estimatedDurationToComplete(task?: Task): moment.Duration {
  return task ? moment.duration(task.estimate, "minutes") : moment.duration(0);
}

export function estimateEndOf(task?: Task): Date {
  return task
    ? moment(task.priority)
        .add(estimatedDurationToComplete(task), "minute")
        .toDate()
    : Time.current();
}

export function estimatedPeriodOf(task?: Task): Period {
  return task
    ? {
        start: estimatedStartOf(task),
        end: estimateEndOf(task),
      }
    : { start: Time.current(), end: Time.current() };
}

export function supertaskOf(task: Task, candidates: Task[]): Task | undefined {
  return task && task.supertaskId && candidates
    ? candidates.find((candidate) => task.supertaskId === candidate.id)
    : undefined;
}

export function supertasksOf(
  task: Task,
  candidates: Task[]
): Task[] | undefined {
  if (!task || !candidates || candidates.length === 0) {
    return undefined;
  }

  let current: Task | undefined = task;
  candidates = [...candidates]; // Do not mutate original!
  const result: Task[] = [];
  while (current) {
    const next = supertaskOf(current, candidates);
    if (
      next &&
      next.id !== task.id &&
      !result.find((task) => task.id === next.id)
    ) {
      result.push(next);
      candidates.splice(candidates.indexOf(next), 1);
    }
    current = next;
  }

  return result;
}

export function subtasksOf<T extends Task>(
  task: T,
  candidates: T[]
): T[] | undefined {
  const result =
    task && candidates
      ? prioritize(
          candidates.filter((candidate) => candidate.supertaskId === task.id)
        )
      : undefined;
  return result && result.length > 0 ? result : undefined;
}

export function predecessorsOf<T extends Task>(
  task: T,
  candidates: T[]
): T[] | undefined {
  const result =
    task && task.predecessorIds && candidates
      ? candidates.filter((candidate) =>
          (task.predecessorIds || []).includes(candidate.id)
        )
      : undefined;
  return result && result.length > 0 ? result : undefined;
}

export function successorsOf<T extends Task>(task: T, candidates: T[]) {
  const result =
    task && candidates
      ? candidates.filter(
          (candidate) =>
            candidate.predecessorIds &&
            candidate.predecessorIds.includes(task.id)
        )
      : undefined;
  return result && result.length > 0 ? result : undefined;
}

export function isTask(candidate: any) {
  return (
    candidate?.hasOwnProperty("priority") &&
    candidate?.hasOwnProperty("estimate")
  );
}

export function tasksIn<T extends Todo>(todos: Todo[]): T[] {
  return todos.filter(isTask) as T[];
}

export interface TaskContext {
  task: Task;
  error?: string;
}

export const createTaskMachine = (task: Task, upsert: Upserter<Task>) =>
  createMachine<TaskContext>({
    id: "task",
    initial: "unmodified",
    context: { task },
    on: {},
    states: {
      unmodified: {
        on: {
          SAVE: {
            target: "saving",
          },
        },
      },
      saving: {
        invoke: {
          id: "upsert",
          src: (context, event) => upsert({ ...context.task, ...event.task }),
          onDone: {
            target: "unmodified",
            actions: assign({ task: (context, event) => event.data }),
          },
          onError: {
            target: "error",
            actions: assign({
              error: (context, event) => JSON.stringify({ context, event }),
            }),
          },
        },
      },
      error: {},
    },
  });

export const defaultTasks: Task[] = [
  {
    id: 1,
    title: "Use Whenner",
    description: "This is done already!",
    estimate: 5,
    completed: Time.current(),
    priority: Time.now(),
  },
  {
    id: 2,
    title: "Get started with Whenner",
    description: "Click stuff, learn how the app works",
    estimate: 5,
    priority: Time.now() + 1,
  },
];
