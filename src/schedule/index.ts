// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright © 2021 James Tharpe

import { isAppointment } from "../appointment";
import Chronotype, { preferredStart } from "../chronotype";
import { sortByPriority } from "../attribs/prioritizable";
import Time from "../time";
import { defaultChronotype } from "../data/defaults";
import Event, { endPriorityOf, eventsOverlap, startPriorityOf } from "../event";
import Task, { isTask } from "../task";

export interface Schedule {
  readonly chronotype: Chronotype;
  readonly events: Event[];
}

export function schedule(
  events: Event[],
  chronotype: Chronotype = defaultChronotype
): Schedule {
  let currentPriority = Time.now();
  return {
    chronotype,
    events: sortByPriority(startPriorityOf, ...events).reduce<Event[]>(
      (schedule, todo) => {
        // Avoid Mutations
        const previousCopy: Event = { ...schedule[schedule.length - 1] };
        const currentCopy: Event = { ...todo };

        if (
          eventsOverlap(previousCopy, currentCopy) &&
          isTask(previousCopy) &&
          isAppointment(currentCopy)
        ) {
          (previousCopy as unknown as Task).priority = Math.max(
            endPriorityOf(currentCopy),
            currentPriority
          );
          currentPriority = endPriorityOf(previousCopy);
        } else if (isTask(currentCopy)) {
          (currentCopy as unknown as Task).priority = Math.max(
            endPriorityOf(previousCopy),
            currentPriority
          );

          (currentCopy as unknown as Task).priority = preferredStart(
            new Date((currentCopy as unknown as Task).priority),
            chronotype
          ).getTime();

          currentPriority = endPriorityOf(currentCopy);
        }

        schedule.push(currentCopy);
        return schedule;
      },
      new Array<Event>()
    ),
  };
}
