// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright (C) 2019  James Tharpe

import { Todo } from "./Todo";
import { Period } from "./time/Period";
import { Time } from "./time";
import { addHour } from "./time/utils";

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
    completed: undefined,
  },
];

export function isAppointment(thing: any) {
  return thing?.hasOwnProperty("start") && thing?.hasOwnProperty("end");
}

export function appointments(todos: Todo[]) {
  return todos.filter(isAppointment);
}
