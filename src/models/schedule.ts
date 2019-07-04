import { ITodo, sortedTodoList, Todo } from "./Todo";
import { Chronotype } from "./Chronotype";
import moment from "moment";

function adjustStart(todo: Todo, { start, end }: Chronotype) {
  start = moment.duration(start); // In case of serialization
  end = moment.duration(end); // In case of serialization

  const earliest = moment(todo.start)
    .startOf("day")
    .add(start)
    .toDate();

  if (todo.start < earliest) {
    todo.start = earliest;
  }

  const maxTaskLength = end.asMinutes() - start.asMinutes();
  const latest = moment(todo.end)
    .startOf("day")
    .add(end)
    .toDate();
  if (todo.end > latest && todo.estimate <= maxTaskLength) {
    todo.start = moment(todo.start)
      .add(1, "day")
      .startOf("day")
      .toDate();
    adjustStart(todo, { start, end });
  }
}

export function schedule(
  chonotype: Chronotype,
  ...todos: ITodo[]
): ITodo[] {
  const result = sortedTodoList(...todos);
  const notDone = result.filter(todo => !todo.done);

  const lastIndex = notDone.length - 1;
  if (lastIndex === -1) return result;

  notDone[0].start = new Date();
  for (let i = 0; i <= lastIndex; i++) {
    const current = notDone[i];
    adjustStart(current, chonotype);
    if (i < lastIndex) {
      notDone[i + 1].start = new Date(current.end);
    }
  }

  return result;
}
