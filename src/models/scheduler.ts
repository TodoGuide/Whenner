import { Chronotype, defaultChronotype } from "./Chronotype";
import { ScheduledTask } from "./ScheduledTask";
import { Task, ITask, taskPrioritizer } from "./Task";
import { prioritize } from "./Priority";

let lastChronotype = defaultChronotype;

export function schedule(chronotype: Chronotype, ...tasks: ITask[]): ITask[] {
  if (tasks.length === 0) {
    return tasks;
  }

  const result: ITask[] = prioritize(taskPrioritizer, ...tasks.map(t => new Task(t)));
  let lastIncomplete: Task | undefined = undefined;
  
  for (let i = 0; i < result.length; i++) {
    const previous = result[i - 1] as Task;
    const current = result[i] as Task;
    lastIncomplete = (previous && previous.completed) ? lastIncomplete : previous;
    result[i] = new ScheduledTask(chronotype, current, lastIncomplete);
  }

  lastChronotype = chronotype;
  return result;
}