// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright © 2021 James Tharpe

import Time from "./time";
import Period, { isPeriod } from "./time/period";
import Todo, { isTodo } from "./todo";

/**
 * Something to be done in a preset period of time.
 *
 * @export
 * @interface Appointment
 * @extends {Todo}
 * @extends {Period}
 */
export default interface Appointment extends Todo, Period {}

export const emptyAppointment: Appointment = {
  id: 0,
  title: "",
  description: "",
  start: Time.current(),
  end: Time.current(),
  canceled: null,
};

export function appointmentFrom(
  appointmentLike: Partial<Appointment>
): Appointment {
  return { ...emptyAppointment, ...appointmentLike };
}

export function isAppointment(todo: Partial<Todo>) {
  return isTodo(todo) && isPeriod(todo);
}

export function appointments(todos: Todo[]): Array<Appointment> {
  return todos.filter(isAppointment) as Array<Appointment>;
}
