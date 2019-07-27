import { IChronotype, Chronotype, defaultChronotype } from "./Chronotype";
import { ScheduledTask } from "./ScheduledTask";
import { Task, ITask } from "./Task";
import { inPriorityOrder } from "./Todo";

let lastChronotype = defaultChronotype;

export function schedule(chronotype: IChronotype, ...tasks: ITask[]): ITask[] {
  if (tasks.length === 0) {
    return tasks;
  }

  const result: ITask[] = inPriorityOrder(...tasks.map(t => new Task(t)));
  const chronotypeHelper = new Chronotype(chronotype);
  let lastIncomplete: Task | undefined = undefined;
  
  for (let i = 0; i < result.length; i++) {
    const previous = result[i - 1] as Task;
    const current = result[i] as Task;
    lastIncomplete = (previous && previous.completed) ? lastIncomplete : previous;
    result[i] = new ScheduledTask(chronotypeHelper, current, lastIncomplete);
  }

  lastChronotype = chronotype;
  return result;
}

export function quickSchedule(...tasks: ITask[]): ITask[] {
  return schedule(lastChronotype, ...tasks);
}