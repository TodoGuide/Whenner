// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright (C) 2019  James Tharpe

import Time from "./time";
import Period, { isPeriod } from "./time/period";
import { addHour } from "./time/utils";
import { isTodo, Todo } from "./Todo";

/**
 * Something to be done in a preset period of time.
 *
 * @export
 * @interface Appointment
 * @extends {Todo}
 * @extends {Period}
 */
export interface Appointment extends Todo, Period {}

export const defaultAppointments: Appointment[] = [
  {
    id: Time.now(),
    title: "Call someone you love",
    description: "Let them know how much you appreciate them",
    start: addHour(Time.current()),
    end: addHour(addHour(Time.current())),
  },
];

export function isAppointment(todo: Todo) {
  return isTodo(todo) && isPeriod(todo);
}

export function appointments(todos: Todo[]): Array<Appointment> {
  return todos.filter(isAppointment) as Array<Appointment>;
}
