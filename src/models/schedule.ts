import { ITodo, sortedTodoList, Todo } from "./Todo";
import { IChronotype, Chronotype } from "./Chronotype";
import moment from "moment";

class ScheduledTodo extends Todo {
  constructor(public chronotype: Chronotype, current: Todo, previous?: Todo) {
    super({
      ...current,
      start: current.done
        ? current.start
        : ScheduledTodo.firstAvailableStartDate(chronotype, current, previous)
    });
  }

  private static earliestStartDateCandidate(
    { start }: ITodo | { start: Date },
    chronotype: Chronotype
  ) {
    const dayStart = chronotype.startOf(start);
    return start < dayStart ? dayStart : start;
  }

  /**
   * Determines if the todo can be completed as-scheduled based on the provided Chronotype
   */
  private static canBeCompletedSameDay({ end }: Todo, chronotype: Chronotype) {
    return end <= chronotype.endOf(end);
  }

  /**
   * Determines if the todo can be within the a single Chronotype period
   */
  private static canBeCompletedWithinOneDay(
    { estimate }: ITodo,
    { minutes }: Chronotype
  ) {
    return estimate <= minutes;
  }

  /**
   * Calculates the earliest date and time the todo can be started based on the provided Chronotype.
   */
  private static earliestStartDatePermitted(
    { start: todoStart }: Todo | { start: Date },
    { start: chronotypeStart }: IChronotype
  ) {
    const dayStart = Chronotype.getStartOf(todoStart, {
      start: chronotypeStart
    });
    return todoStart < dayStart ? dayStart : todoStart;
  }

  /**
   * Calculates the earliest date and time the todo can be started and completed within the same day
   * based on the provided Chronotype.
   */
  private static firstAvailableStartDate(
    chronotype: Chronotype,
    current: Todo,
    previous?: Todo
  ) {
    const candidate = ScheduledTodo.earliestStartDateCandidate(
      { start: (previous || { end: new Date() }).end },
      chronotype
    );
    return !ScheduledTodo.canBeCompletedSameDay(current, chronotype) &&
      ScheduledTodo.canBeCompletedWithinOneDay(current, chronotype)
      ? ScheduledTodo.earliestStartDatePermitted(
          {
            start: moment(candidate)
              .add(1, "day")
              .startOf("day")
              .toDate()
          },
          chronotype
        )
      : candidate;
  }
}

export function schedule(chronotype: IChronotype, ...todos: ITodo[]): ITodo[] {
  if (todos.length === 0) {
    return todos;
  }

  console.log("schedule todos", todos);
  const result: ITodo[] = sortedTodoList(...todos);
  const chronotypeHelper = new Chronotype(chronotype);
  for (let i = 0; i < result.length; i++) {
    const previous = result[i - 1] as Todo;
    const current = result[i] as Todo;
    result[i] = new ScheduledTodo(chronotypeHelper, current, previous);
  }

  return result;
}
