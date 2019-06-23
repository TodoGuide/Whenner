import { Settings } from "./Settings";
import { ITodo, Todo } from "./Todo";

export function schedule(
  { dayStart: startTime, dayEnd: endTime }: Settings,
  ...todos: ITodo[]
): ITodo[] {
  const result = todos.map(todo => new Todo(todo));
  const notDone = result
    .filter(todo => !todo.done)
    .sort((a, b) => a.start.getTime() - b.start.getTime());

  const lastIndex = notDone.length - 1;
  if (lastIndex === -1) return result;

  notDone[0].start = new Date();
  for (let i = 0; i <= lastIndex; i++) {
    const current = notDone[i];
    current.adjustStart({ dayStart: startTime, dayEnd: endTime });
    if (i < lastIndex) {
      notDone[i + 1].start = new Date(current.end);
    }
  }

  return result;
}