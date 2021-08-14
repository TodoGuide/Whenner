// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright (C) 2019  James Tharpe

import { isAppointment } from "./Appointment";
import { Chronotype, preferredStart } from "./Chronotype";
import { endPriorityOf, Event, eventsOverlap, startPriorityOf } from "./Event";
import { sortByPriority } from "./priority";
import { isTask, Task } from "./Task";
import Time from "./time";

export interface Schedule {
  readonly chronotype: Chronotype;
  readonly events: Event[];
}

export function schedule(events: Event[], chronotype: Chronotype): Schedule {
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
          (previousCopy as Task).priority = Math.max(
            endPriorityOf(currentCopy),
            currentPriority
          );
          currentPriority = endPriorityOf(previousCopy);
        } else if (isTask(currentCopy)) {
          (currentCopy as Task).priority = Math.max(
            endPriorityOf(previousCopy),
            currentPriority
          );

          (currentCopy as Task).priority = preferredStart(
            new Date((currentCopy as Task).priority),
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
