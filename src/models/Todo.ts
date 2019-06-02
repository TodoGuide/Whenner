import moment from "moment";
import { Settings } from "./Settings";

export interface ITodo {
  id: number;
  title: string;
  description: string;
  estimate: number;
  start: Date;
  done: boolean;
}

export class Todo implements ITodo {
  constructor(todo: ITodo) {
    Object.assign(this, todo);
    this.start = new Date(this.start); // JavaScript stores dates as strings when serializing
  }

  id: number = Date.now();
  title: string = "";
  description: string = "";
  estimate: number = 60;
  start: Date = new Date();
  done: boolean = false;

  get end() {
    return moment(this.start)
      .add(this.duration)
      .toDate();
  }

  set end(end: Date) {
    this.estimate = moment
      .duration(moment(this.end).diff(this.start))
      .asMinutes();
  }

  get duration() {
    return moment.duration(this.estimate, "minutes");
  }

  adjustStart({ dayStart, dayEnd }: Settings) {
    dayStart = moment.duration(dayStart);
    dayEnd = moment.duration(dayEnd);
    const earliest = moment(this.start)
      .startOf("day")
      .add(dayStart)
      .toDate();
    if (this.start < earliest) {
      this.start = earliest;
    }

    const maxTaskLength = dayEnd.asMinutes() - dayStart.asMinutes();
    const latest = moment(this.end)
      .startOf("day")
      .add(dayEnd)
      .toDate();
    if (this.end > latest && this.estimate <= maxTaskLength) {
      this.start = moment(this.start)
        .add(1, "day")
        .startOf("day")
        .toDate();
      this.adjustStart({ dayStart, dayEnd });
    }
  }
}

export function schedule(
  { dayStart: startTime, dayEnd: endTime }: Settings,
  ...todos: ITodo[]
): ITodo[] {
  const result = todos.map(todo => new Todo(todo));
  const notDone = result
    .filter(todo => !todo.done)
    .sort((a, b) => a.start.getTime() - b.start.getTime());

  const lastIndex = notDone.length - 1;
  if (lastIndex === -1) return result;

  notDone[0].start = new Date();
  for (let i = 0; i <= lastIndex; i++) {
    const current = notDone[i];
    current.adjustStart({ dayStart: startTime, dayEnd: endTime });
    if (i < lastIndex) {
      notDone[i + 1].start = current.end;
    }
  }

  return result;
}
