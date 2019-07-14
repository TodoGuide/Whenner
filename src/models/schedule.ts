import { ITodo, sortedTodoList, Todo } from "./Todo";
import { IChronotype, Chronotype, defaultChronotype } from "./Chronotype";
import { ScheduledTodo } from "./ScheduledTodo";

let lastChronotype = defaultChronotype;

export function schedule(chronotype: IChronotype, ...todos: ITodo[]): ITodo[] {
  if (todos.length === 0) {
    return todos;
  }

  const result: ITodo[] = sortedTodoList(...todos);
  const chronotypeHelper = new Chronotype(chronotype);
  let lastIncomplete: Todo | undefined = undefined;
  
  for (let i = 0; i < result.length; i++) {
    const previous = result[i - 1] as Todo;
    const current = result[i] as Todo;
    lastIncomplete = (previous && previous.done) ? lastIncomplete : previous;
    result[i] = new ScheduledTodo(chronotypeHelper, current, lastIncomplete);
  }

  lastChronotype = chronotype;
  return result;
}

export function quickSchedule(...todos: ITodo[]): ITodo[] {
  return schedule(lastChronotype, ...todos);
}