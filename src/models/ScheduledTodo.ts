import { ITodo, Todo } from "./Todo";
import { IChronotype, Chronotype } from "./Chronotype";
import moment from "moment";
import { Time } from "./time";

export class ScheduledTodo extends Todo {
  constructor(chronotype: Chronotype, current: Todo, previous?: Todo) {
    super({
      ...current,
      start: current.done
        ? current.start
        : ScheduledTodo.firstAvailableStartDate(chronotype, current, previous)
    });
  }

  private static earliestStartDateCandidate(
    {
      start
    }:
      | ITodo
      | {
          start: Date;
        },
    chronotype: Chronotype
  ) {
    const dayStart = chronotype.startOf(start);
    const result = start < dayStart ? dayStart : start;
    console.log("earliestStartDateCandidate", {
      start,
      dayStart,
      result
    });
    return result;
  }

  /**
   * Determines if the todo can be completed as-scheduled based on the provided Chronotype
   */
  private static canBeCompletedSameDay(
    { end }: Todo | { end: Date },
    chronotype: Chronotype
  ) {
    const result = end <= chronotype.endOf(end);
    console.log("canBeCompletedSameDay", {
      result,
      end,
      limit: chronotype.endOf(end)
    });
    return result;
  }

  /**
   * Determines if the todo can be within the a single Chronotype period
   */
  private static canBeCompletedWithinOneDay(
    { estimate }: ITodo,
    { minutes }: Chronotype
  ) {
    const result = estimate <= minutes;
    console.log("canBeCompletedWithinOneDay", { estimate, minutes, result })
    return result;
  }

  /**
   * Calculates the earliest date and time the todo can be started based on the provided Chronotype.
   */
  private static earliestStartDatePermitted(
    {
      start: todoStart
    }:
      | Todo
      | {
          start: Date;
        },
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
      { start: (previous || { end: Time.current() }).end },
      chronotype
    );
    const result = !ScheduledTodo.canBeCompletedSameDay(
      { end: candidate },
      chronotype
    ) && ScheduledTodo.canBeCompletedWithinOneDay(current, chronotype)
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
    console.log("firstAvailableStartDate", { candidate, result })
  }
}
