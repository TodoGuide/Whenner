// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright (C) 2019  James Tharpe

import { Estimated } from "./time/Estimated";
import { Todo } from "./Todo";
import {
  Priority,
  prioritize as defaultPrioritize,
  prioritizer
} from "./Priority";

/**
 * A {@link Todo} that needs to be completed based on priority and estimated duration. Unlike an {@link Appointment}, which is to be completed based on fixed Start and End times.
 *
 * @export
 * @interface Task
 * @extends {Todo}
 * @extends {Priority}
 * @extends {Estimated}
 */
export interface Task extends Todo, Priority, Estimated {
  predecessorIds?: number[];
  supertaskId?: number;
}

export const taskPrioritizer = prioritizer;

export function prioritize(tasks: Task[]) {
  return defaultPrioritize(taskPrioritizer, ...tasks);
}

export function supertaskOf(task: Task, candidates: Task[]): Task | undefined {
  return task && task.supertaskId && candidates
    ? candidates.find(candidate => task.supertaskId === candidate.id)
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
      !result.find(task => task.id === next.id)
    ) {
      result.push(next);
      candidates.splice(candidates.indexOf(next), 1);
    }
    current = next;
  }

  return result;
}

export function subtasksOf(
  taskId: number,
  candidates: Task[]
): Task[] | undefined {
  console.log("subtasksOf", { taskId, candidates });

  const result =
    taskId && candidates
      ? prioritize(
          candidates.filter(candidate => candidate.supertaskId === taskId)
        )
      : undefined;
  return result && result.length > 0 ? result : undefined;
}

export function predecessorsOf(
  task: Task,
  candidates: Task[]
): Task[] | undefined {
  const result =
    task && task.predecessorIds && candidates
      ? candidates.filter(candidate =>
          (task.predecessorIds || []).includes(candidate.id)
        )
      : undefined;
  return result && result.length > 0 ? result : undefined;
}

export function successorsOf(task: Task, candidates: Task[]) {
  const result =
    task && candidates
      ? candidates.filter(
          candidate =>
            candidate.predecessorIds &&
            candidate.predecessorIds.includes(task.id)
        )
      : undefined;
  return result && result.length > 0 ? result : undefined;
}
