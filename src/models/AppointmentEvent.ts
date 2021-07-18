// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright (C) 2019  James Tharpe

import { Todo } from "./Todo";
import { Priority, Prioritizer } from "./Priority";
import { Time } from "./time";
import { lengthInMinutes } from "./time/Period";
import { addHour } from "./time/utils";
import { Event } from "./Event";
import moment from "moment";
import { Appointment } from "./Appointment";

export class AppointmentEvent implements Appointment, Event {
  _completed?: Date;
  description: string = "";
  end: Date = addHour(Time.current());
  id: number = Time.now();
  start: Date = Time.current();
  title: string = "";

  constructor(todo?: Appointment | Todo | Priority) {
    Object.assign(this, todo);

    // JavaScript stores dates as strings when serializing,
    // so re-construct in case we received a string
    this.start = new Date(this.start || (todo as Priority).priority);
    this.end = new Date(this.end);
  }

  get completed() {
    if (!this._completed && this.end <= Time.current()) {
      this._completed = this.end;
    }
    return this._completed;
  }

  set completed(completed: Date | undefined) {
    this._completed = completed;
  }

  get estimate() {
    return lengthInMinutes(this);
  }

  set estimate(estimate: number) {
    this.end = moment(this.start).add(estimate, "minutes").toDate();
  }

  get priority() {
    return this.start.getTime();
  }

  set priority(priority: number) {
    this.start = new Date(priority);
  }
}

export const appointmentPrioritizer: Prioritizer<Appointment> = (item) =>
  item.start.getTime();

export const defaultAppointments: Appointment[] = [
  // {
  //   id: Time.now(),
  //   title: "Call someone you love",
  //   description: "Let them know how much you appreciate them",
  //   start: addHour(Time.current()),
  //   end: addHour(addHour(Time.current())),
  //   completed: undefined
  // }
];

export function isAppointment(thing: any) {
  try {
    const appointmentProperties = Object.keys(new AppointmentEvent());
    const thingProperties = Object.keys(thing);
    return appointmentProperties.every(
      (property) => thingProperties.indexOf(property) >= 0
    );
  } catch {
    return false;
  }
}

export function appointments(todos: Todo[]) {
  return todos.filter(isAppointment);
}
