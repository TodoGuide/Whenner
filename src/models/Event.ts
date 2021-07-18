// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright (C) 2019  James Tharpe

import { Appointment } from "./Appointment";
import { Prioritizer } from "./Priority";
import { estimatedPeriodOf, estimateEndOf, Task } from "./Task";
import { Time } from "./time";
import {
  inMinutes,
  Period,
  periodOf as getPeriod,
  periodsOverlap,
} from "./time/Period";

export type Event = Task | Appointment;

export class NormalizedEvent implements Task, Appointment {
  private task: Task;
  private appointment: Appointment;

  constructor(private event: Event) {
    this.task = event as Task;
    this.appointment = event as Appointment;
  }

  get start() {
    return startOf(this.event);
  }

  get end() {
    return endOf(this.event);
  }

  get predecessorIds() {
    return this.task.predecessorIds;
  }

  get supertaskId() {
    return this.task.supertaskId;
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
    return startPriorityOf(this.event);
  }

  get estimate() {
    return durationInMinutes(this.event);
  }
}

export function periodOf(event: Event): Period {
  return getPeriod(event) || estimatedPeriodOf(event as Task);
}

export function durationInMinutes(event: Event): number {
  return inMinutes(periodOf(event));
}

export function eventsOverlap(event1: Event, event2: Event): boolean {
  return event1 && event2 && periodsOverlap(periodOf(event1), periodOf(event2));
}

export function startPriorityOf(event: Event): number {
  return (
    (event as Task).priority ||
    (event as Appointment).start?.getTime() ||
    Time.now()
  );
}

export function endPriorityOf(event: Event | Period): number {
  return (
    (event as Period)?.end?.getTime() ||
    estimateEndOf(event as Task)?.getTime() ||
    Time.now()
  );
}

export function startOf(event: Event): Date {
  return (event as Appointment).start || new Date((event as Task).priority);
}

export function endOf(event: Event): Date {
  return (event as Appointment).end || estimateEndOf(event as Task);
}

export function completed(event: Event): Date | undefined {
  return (event as Task).completed ||
    (event as Appointment).end?.getTime() ||
    0 <= Time.now()
    ? (event as Appointment).end
    : undefined;
}

export function incomplete(events: Event[]): Event[] {
  return events.filter((event) => !completed(event));
}

export const eventPrioritizer: Prioritizer<Event> = (event: Event) =>
  (event as Task).priority || (event as Appointment).start.getTime();
