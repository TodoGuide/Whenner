// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright © 2021 James Tharpe

import moment from "moment";
import { ActorRef, State } from "xstate";
import RecordActor from "../crud/record.actor";
import RecordContext from "../crud/record.context";
import RecordEvent from "../crud/record.events";
import { Completable, isCompletable } from "../attribs/completable";
import {
  isPrioritizable,
  Prioritizable,
  prioritizer,
  sortByPriority as defaultPrioritize,
} from "../attribs/prioritizable";
import Time from "../time";
import { Estimable, isEstimable } from "../time/estimation";
import Period from "../time/period";
import Todo, { isTodo } from "../todo";

/**
 * A prioritized, estimated to-do with flexible start and end times.
 *
 * @export
 * @interface Task
 * @extends {Todo}
 * @extends {Prioritizable}
 * @extends {Estimable}
 */
export default interface Task
  extends Todo,
    Prioritizable,
    Estimable,
    Completable {
  readonly predecessorIds?: number[];
  readonly supertaskId?: number;
}

export function taskFrom(taskLike: Partial<Task>): Task {
  return { ...emptyTask, ...taskLike };
}

export const emptyTask: Task = {
  canceled: null,
  completed: null,
  description: "",
  estimate: 20,
  id: 0,
  priority: 0,
  title: "",
  predecessorIds: [],
  supertaskId: undefined,
};

export function isTask(candidate: any) {
  const result =
    isTodo(candidate) &&
    isPrioritizable(candidate) &&
    isEstimable(candidate) &&
    isCompletable(candidate);
  // console.log("isTask", { candidate, result });
  return result;
}

export function complete(task: Task) {
  return { ...task, complete: Time.current(), canceled: undefined };
}

export function cancel(task: Task) {
  return { ...task, complete: undefined, canceled: Time.current() };
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

export function tasksIn<T extends Todo>(todos: T[]): T[] {
  return todos.filter(isTask) as T[];
}

export interface TaskContext {
  task: Task;
  error?: string;
}
