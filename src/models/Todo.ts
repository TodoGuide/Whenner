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
  constructor(todo?: ITodo | null) {
    Object.assign(this, todo);
    this.start = new Date(this.start || Date.now); // JavaScript stores dates as strings when serializing
  }

  id: number = Date.now();
  title: string = "";
  description: string = "";
  estimate: number = 60;
  start: Date = new Date();
  done: boolean = false;

  get end() {
    return Todo.calculateEnd(this);
  }

  set end(end: Date) {
    this.estimate = moment
      .duration(moment(this.end).diff(this.start))
      .asMinutes();
  }

  get duration() {
    return Todo.estimateToDuration(this);
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

  static estimateToDuration({ estimate }: { estimate: number }) {
    return moment.duration(estimate, "minutes");
  }

  static calculateEnd({ start, estimate }: ITodo) {
    return moment(start)
      .add(Todo.estimateToDuration({ estimate }))
      .toDate();
  }
}
