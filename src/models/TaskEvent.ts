// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright (C) 2019  James Tharpe

import { Time } from "./time";
import { Period, periodOf } from "./time/Period";
import {
  StartEstimated,
  EndEstimated,
  Estimated,
  estimated,
} from "./time/Estimated";
import { Todo, EstimatedTodo } from "./Todo";
import moment, { Duration } from "moment";
import { Event } from "./Event";
import { Task } from "./Task";

export class TaskEvent implements Task, Event {
  private _completed?: Date;
  id: number = Time.now();
  title: string = "";
  description: string = "";
  estimate: number = 60;
  start: Date = Time.current();
  predecessorIds?: number[];

  constructor(todo?: Task | EstimatedTodo | Todo) {
    Object.assign(this, todo);

    // JavaScript stores dates as strings when serializing,
    // so re-construct in case we received a string
    this.priority = new Date(
      this.start || this.priority || Time.now()
    ).getTime();

    if (this._completed) {
      this._completed = new Date(this._completed);
    }

    const todoPeriod = periodOf(todo);
    if (todoPeriod && !estimated(todo)) {
      this.estimate = TaskEvent.periodToEstimate(todoPeriod);
    }
  }

  get completed() {
    return this._completed;
  }

  set completed(completed: Date | undefined) {
    const changed = this._completed !== completed;
    this._completed = completed;
    if (changed && completed) {
      this.start = TaskEvent.calculateStart(this);
    }
  }

  get duration() {
    return TaskEvent.estimateToDuration(this);
  }

  set duration(duration: Duration) {
    this.estimate = duration.asMinutes();
  }

  get end() {
    return this.completed || TaskEvent.calculateEnd(this);
  }

  set end(end: Date) {
    this.estimate = moment.duration(moment(end).diff(this.start)).asMinutes();
  }

  get priority() {
    return this.start.getTime();
  }

  set priority(priority: number) {
    this.start = new Date(priority);
  }

  //
  // Utility Methods
  //

  static calculateEnd({ start, estimate }: StartEstimated) {
    return moment(start)
      .add(TaskEvent.estimateToDuration({ estimate }))
      .toDate();
  }

  static calculateStart({ end, estimate }: EndEstimated) {
    return moment(end)
      .subtract(TaskEvent.estimateToDuration({ estimate }))
      .toDate();
  }

  static estimateToDuration({ estimate }: Estimated) {
    return moment.duration(estimate, "minutes");
  }

  static periodToEstimate({ start, end }: Period) {
    return moment.duration(moment(end).diff(start)).asMinutes();
  }
}

export function isTask(thing: any) {
  try {
    const taskProperties = Object.keys(new TaskEvent());
    const thingProperties = Object.keys(thing);
    return taskProperties.every(
      (property) => thingProperties.indexOf(property) >= 0
    );
  } catch {
    return false;
  }
}

export function tasks(todos: Todo[]) {
  return todos.filter(isTask);
}

export const defaultTasks: Task[] = [
  new TaskEvent({
    id: 1,
    title: "Use Whenner",
    description: "This is done already!",
    estimate: 5,
    completed: Time.current(),
    priority: Time.now(),
  }),
  new TaskEvent({
    id: 2,
    title: "Get started with Whenner",
    description: "Click stuff, learn how the app works",
    estimate: 5,
    priority: Time.now() + 1,
  }),
];
