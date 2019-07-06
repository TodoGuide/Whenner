import { Todo } from "./Todo";
import { IChronotype, Chronotype } from "./Chronotype";
import { Time, Start, End, Estimate } from "./time";

export class ScheduledTodo extends Todo {
  constructor(chronotype: Chronotype, current: Todo, previousIncomplete?: Todo) {
    if(previousIncomplete && previousIncomplete.done){
      throw new Error("Previous value cannot be marked as done");
    }
    super({
      ...current,
      start: current.done
        ? current.start
        : ScheduledTodo.firstAvailableStartDate(chronotype, current, previousIncomplete)
    });
    console.log("ScheduledTodo", { me: this, current, previous: previousIncomplete });
  }

  private static earliestStartDateCandidate(
    { start }: Start,
    chronotype: Chronotype
  ) {
    const dayStart = chronotype.startOf(start);
    return start < dayStart ? dayStart : start;
  }

  /**
   * Determines if the todo can be completed as-scheduled based on the provided Chronotype
   */
  private static canBeCompletedSameDay({ end }: End, chronotype: Chronotype) {
    return end <= chronotype.endOf(end);
  }

  /**
   * Determines if the todo can be within the a single Chronotype period
   */
  private static canBeCompletedWithinOneDay(
    { estimate }: Estimate,
    { minutes }: Chronotype
  ) {
    return estimate <= minutes;
  }

  /**
   * Calculates the earliest date and time the todo can be started based on the provided Chronotype.
   */
  private static earliestStartDatePermitted(
    { start: todoStart }: Start,
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
  ): Date {
    // console.log("firstAvailableStartDate", {current, previous})
    const candidateStart = ScheduledTodo.earliestStartDateCandidate(
      { start: (previous || { end: Time.current() }).end },
      chronotype
    );
    const estimated = { ...current, start: candidateStart };
    const candidateEnd = Todo.calculateEnd(estimated);
    const result =
      !ScheduledTodo.canBeCompletedSameDay({ end: candidateEnd }, chronotype) &&
      ScheduledTodo.canBeCompletedWithinOneDay(estimated, chronotype)
        ? ScheduledTodo.earliestStartDatePermitted(
            {
              start: Time.dayAfter(candidateStart)
            },
            chronotype
          )
        : candidateStart;
    // console.log("firstAvailableStartDate", { candidate: candidateStart, result });
    return result;
  }
}
