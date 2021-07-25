// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright (C) 2019  James Tharpe

import { Appointment } from "./Appointment";
import { estimatedPeriodOf, estimateEndOf, Task } from "./Task";
import { Time } from "./time";
import {
  minutesIn,
  Period,
  periodOf as getPeriod,
  periodsOverlap,
} from "./time/Period";
import { dateValueOf, timeValueOf } from "./time/utils";

export type Event = Task | Appointment;

export class NormalizedEvent implements Task, Appointment {
  constructor(private event: Event) {}

  get start() {
    return startOf(this.event) || Time.current();
  }

  get end() {
    return endOf(this.event);
  }

  get predecessorIds() {
    return (this.event as Task).predecessorIds;
  }

  get supertaskId() {
    return (this.event as Task).supertaskId;
  }

  get completed() {
    return completed(this.event);
  }

  get id() {
    return this.event.id;
  }

  get title() {
    return this.event.title;
  }

  get description() {
    return this.event.description;
  }

  get priority() {
    return startPriorityOf(this.event) || Time.now();
  }

  get estimate() {
    return durationInMinutes(this.event);
  }
}

export function periodOf(event: Event): Period {
  return getPeriod(event) || estimatedPeriodOf(event as Task);
}

export function durationInMinutes(event: Event): number {
  return minutesIn(periodOf(event));
}

export function eventsOverlap(event1: Event, event2: Event): boolean {
  return event1 && event2 && periodsOverlap(periodOf(event1), periodOf(event2));
}

export function endPriorityOf(event: Event | Period): number {
  return (
    timeValueOf((event as Period)?.end || estimateEndOf(event as Task)) ||
    Time.now()
  );
}

export function startOf(event: Event): Date {
  return (
    dateValueOf((event as Appointment).start || (event as Task).priority) ||
    Time.current()
  );
}

export function startPriorityOf(event: Event, log = false): number {
  return startOf(event)?.getTime() || Time.now();
}

export function endOf(event: Event): Date {
  return new Date((event as Appointment).end || estimateEndOf(event as Task));
}

/**
 * If the given event is a task, the completed date is returned. If the event is an appointment,
 * returns the appointment end date only if the end date is in the past.
 *
 * @export
 * @param {Event} event
 * @returns {(Date | undefined)}
 */
export function completed(event: Event): Date | undefined {
  const result =
    dateValueOf((event as Task).completed) ||
    ((timeValueOf((event as Appointment).end) || 0) <= Time.now()
      ? (event as Appointment).end
      : undefined);

  return result && new Date(result);
}

export function incomplete(events: Event[]): Event[] {
  return events.filter((event) => !completed(event));
}
