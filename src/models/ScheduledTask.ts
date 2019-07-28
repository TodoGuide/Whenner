import { preferredStart, Chronotype } from "./Chronotype";
import { Time } from "./time";
import { Task, ITask } from "./Task";
import { Schedule } from "./Schedule";

export class ScheduledTask extends Task implements ITask {
  constructor(
    chronotype: Chronotype,
    current: Task,
    previousIncomplete?: Task
  ) {
    if (previousIncomplete && previousIncomplete.completed) {
      throw new Error("Previous value cannot be marked as done");
    }
    super({
      ...current,
      priority: !!current.completed
        ? current.start.getTime()
        : ScheduledTask.firstAvailableStartDate(
            chronotype,
            current,
            previousIncomplete
          ).getTime()
    });
  }

  /**
   * Calculates the earliest date and time the todo can be started and completed within the same day
   * based on the provided Chronotype.
   */
  private static firstAvailableStartDate(
    chronotype: Chronotype,
    current: Task,
    previous?: Task
  ): Date {
    // console.log("firstAvailableStartDate", {current, previous})
    const candidateStart = preferredStart(
      (previous || { end: Time.current() }).end,
      chronotype
    );
    const estimated = { ...current, start: candidateStart };
    const candidateEnd = Task.calculateEnd(estimated);
    const result =
      !Schedule.canBeCompletedSameDay({ end: candidateEnd }, chronotype) &&
      Schedule.canBeCompletedWithinOneDay(estimated, chronotype)
        ? preferredStart(Time.dayAfter(candidateStart), chronotype)
        : candidateStart;
    // console.log("firstAvailableStartDate", { candidate: candidateStart, result });
    return result;
  }
}
