// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright (C) 2019  James Tharpe

import { defaultAppointments, isAppointment } from "./Appointment";
import { defaultTasks, isTask, Task } from "./Task";
import {
  Chronotype,
  defaultChronotype,
  endOfDayFor,
  lengthInMinutes,
  preferredStart,
} from "./Chronotype";
import { Time } from "./time";
import { Estimated } from "./time/Estimated";
import { End } from "./time/End";
import { sortByPriority } from "./Priority";
import { endPriorityOf, eventsOverlap, Event, eventPrioritizer } from "./Event";

export interface Schedule {
  readonly chronotype: Chronotype;
  readonly events: Event[];
}

export function schedule(events: Event[], chronotype: Chronotype): Schedule {
  let currentPriority = Time.now();
  return {
    chronotype,
    events: sortByPriority(eventPrioritizer, ...events).reduce<Event[]>(
      (schedule, todo) => {
        const previous: Event = schedule[schedule.length - 1];
        if (
          eventsOverlap(previous, todo) &&
          isTask(previous) &&
          isAppointment(todo)
        ) {
          (previous as Task).priority = Math.max(
            endPriorityOf(todo),
            currentPriority
          );
          currentPriority = endPriorityOf(previous);
        } else if (isTask(todo)) {
          (todo as Task).priority = Math.max(
            endPriorityOf(previous),
            currentPriority
          );

          (todo as Task).priority = preferredStart(
            new Date((todo as Task).priority),
            chronotype
          ).getTime();

          currentPriority = endPriorityOf(todo);
        }

        schedule.push(todo);
        return schedule;
      },
      new Array<Event>()
    ),
  };
}

export function canBeCompletedSameDay({ end }: End, chronotype: Chronotype) {
  return end <= endOfDayFor(end, chronotype);
}

/**
 * Determines if the todo can be within the a single Chronotype period
 */
export function canBeCompletedWithinOneDay(
  { estimate }: Estimated,
  chronotype: Chronotype
) {
  return estimate <= lengthInMinutes(chronotype);
}

export const defaultSchedule: Schedule = {
  chronotype: defaultChronotype,
  events: [...defaultTasks, ...defaultAppointments],
};
