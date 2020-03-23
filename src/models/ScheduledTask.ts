// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright (C) 2019  James Tharpe

import { preferredStart, Chronotype } from "./Chronotype";
import { Time } from "./time";
import { TaskEvent } from "./TaskEvent";
import { Task } from "./Task";
import { Schedule } from "./Schedule";

export class ScheduledTask extends TaskEvent implements Task {
  constructor(
    chronotype: Chronotype,
    current: TaskEvent,
    previousIncomplete?: TaskEvent
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
   * Calculates the earliest date and time the todo can start and completed within the same day
   * based on the provided Chronotype.
   */
  private static firstAvailableStartDate(
    chronotype: Chronotype,
    current: TaskEvent,
    previous?: TaskEvent
  ): Date {
    // console.log("firstAvailableStartDate", {current, previous})
    const candidateStart = preferredStart(
      (previous || { end: Time.current() }).end,
      chronotype
    );
    const estimated = { ...current, start: candidateStart };
    const candidateEnd = TaskEvent.calculateEnd(estimated);
    const result =
      !Schedule.canBeCompletedSameDay({ end: candidateEnd }, chronotype) &&
      Schedule.canBeCompletedWithinOneDay(estimated, chronotype)
        ? preferredStart(Time.dayAfter(candidateStart), chronotype)
        : candidateStart;
    // console.log("firstAvailableStartDate", { candidate: candidateStart, result });
    return result;
  }
}
