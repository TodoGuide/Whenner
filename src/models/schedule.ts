import { ITodo, sortedTodoList, Todo } from "./Todo";
import {
  Chronotype,
  lengthInMinutes,
  chronotypeDayStart,
  chronotypeDayEnd
} from "./Chronotype";
import moment, { Duration } from "moment";

/**
 * Calculates the earliest date and time the todo can be started based on the provided Chronotype.
 */
function earliestStartDatePermitted(
  { start: todoStart }: Todo | { start: Date },
  { start: chronotypeStart }: Chronotype
) {
  const dayStart = chronotypeDayStart(todoStart, { start: chronotypeStart });
  return todoStart < dayStart ? dayStart : todoStart;
}

/**
 * Determines if the todo can be completed as-scheduled based on the provided Chronotype
 */
function canBeCompletedSameDay(
  { end: todoEnd }: Todo,
  { end: chronotypeEnd }: Chronotype
) {
  return todoEnd <= chronotypeDayEnd(todoEnd, { end: chronotypeEnd });
}

/**
 * Determines if the todo can be within the a single Chronotype period
 */
function canBeCompletedWithinOneDay(
  { estimate }: Todo,
  chronotype: Chronotype
) {
  return estimate <= lengthInMinutes(chronotype);
}

/**
 * Calculates the earliest date and time the todo can be started and completed within the same day
 * based on the provided Chronotype.
 */
function firstAvailableStartDate(todo: Todo, chronotype: Chronotype) {
  const earliestStart = earliestStartDatePermitted(todo, chronotype);

  return !canBeCompletedSameDay(todo, chronotype) &&
    canBeCompletedWithinOneDay(todo, chronotype)
    ? earliestStartDatePermitted(
        {
          start: moment(earliestStart)
            .add(1, "day")
            .startOf("day")
            .toDate()
        },
        chronotype
      )
    : earliestStart;
}

function mutateStartToComplyWithChronotype(
  todo: Todo,
  { start, end }: Chronotype
) {
  todo.start = firstAvailableStartDate(todo, {
    // Re-wrap start and end as durations in case they were serialized
    start: moment.duration(start),
    end: moment.duration(end)
  });
}

export function schedule(chronotype: Chronotype, ...todos: ITodo[]): ITodo[] {
  const result = sortedTodoList(...todos);
  const notDone = result.filter(todo => !todo.done);

  const lastIndex = notDone.length - 1;
  if (lastIndex === -1) return result;

  notDone[0].start = new Date();
  for (let i = 0; i <= lastIndex; i++) {
    const current = notDone[i];
    mutateStartToComplyWithChronotype(current, chronotype);
    if (i < lastIndex) {
      notDone[i + 1].start = new Date(current.end);
    }
  }

  return result;
}
