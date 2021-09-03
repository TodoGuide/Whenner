// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright © 2021 James Tharpe

import { Crud } from "../services/crud";
import { RecordActor } from "../services/crud/record";
import {
  createRecordSetMachine,
  RecordSetActor,
  RecordSetActorRef,
  RecordSetMachine,
} from "../services/crud/record-set";
import { Appointment, isAppointment } from "./Appointment";
import { estimatedPeriodOf, estimateEndOf, isTask, Task } from "./Task";
import Time from "./time";
import Period, {
  minutesIn,
  periodOf as getPeriod,
  periodsOverlap,
} from "./time/period";
import { dateValueOf, timeValueOf } from "./time/utils";
import { Todo } from "./Todo";

export type Event = Task | Appointment;

export type EventRecordActor = RecordActor<Event>;
export type EventRecordSetActor = RecordSetActor<Event>;
export type EventRecordSetActorRef = RecordSetActorRef<Event>;
export type EventRecordSetMachine = RecordSetMachine<Event>;

export function isEvent(todo: Todo) {
  return isTask(todo) || isAppointment(todo);
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

export function startPriorityOf(event: Event): number {
  return startOf(event)?.getTime() || Time.now();
}

export function endOf(event: Event): Date {
  return new Date((event as Appointment).end || estimateEndOf(event as Task));
}

export function createEventRecordSetMachine(
  crud: Crud<Event>
): EventRecordSetMachine {
  return createRecordSetMachine(crud, "Event");
}

// function eventTypeNameOf(event: Event): "task" | "appointment" | "unknown" {
//   return isTask(event)
//     ? "task"
//     : isAppointment(event)
//     ? "appointment"
//     : "unknown";
// }

// export const createEventMachine = (event: Event) =>
//   createMachine<Completable, Event & { type: string }>(
//     {
//       id: `${eventTypeNameOf(event)}-${event.id}`,
//       initial: "incomplete",
//       // context: event,
//       always: [
//         { target: "closed", cond: "isClosed" },
//         { target: "canceled", cond: "isCanceled" },
//         { target: "opened" },
//       ],
//       states: {
//         opened: {
//           on: {
//             CLOSE: { target: "closed" },
//             CANCEL: { target: "canceled" },
//           },
//         },
//         closed: {
//           on: {
//             OPEN: { target: "opened" },
//             CANCEL: { target: "canceled" },
//           },
//         },
//         canceled: {
//           on: {
//             OPEN: { target: "opened" },
//             COMPLETE: { target: "completed" },
//           },
//         },
//       },
//     },
//     {
//       guards: {
//         isClosed,
//         isCanceled,
//       },
//     }
//   );
