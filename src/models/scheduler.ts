// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright (C) 2019  James Tharpe

import { Chronotype } from "./Chronotype";
import { ScheduledTask } from "./ScheduledTask";
import { TaskEvent, taskPrioritizer } from "./TaskEvent";
import { Task } from "./Task";
import { prioritize } from "./Priority";

export function schedule(chronotype: Chronotype, ...tasks: Task[]): Task[] {
  if (tasks.length === 0) {
    return tasks;
  }

  const result: Task[] = prioritize(
    taskPrioritizer,
    ...tasks.map(t => new TaskEvent(t))
  );
  let lastIncomplete: TaskEvent | undefined = undefined;

  for (let i = 0; i < result.length; i++) {
    const previous = result[i - 1] as TaskEvent;
    const current = result[i] as TaskEvent;
    lastIncomplete = previous && previous.completed ? lastIncomplete : previous;
    result[i] = new ScheduledTask(chronotype, current, lastIncomplete);
  }

  return result;
}
