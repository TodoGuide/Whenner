import moment from "moment";
import { Time, Estimate, Estimated, Period, Start } from "./time";

export interface ITodo extends Start, Estimate, Estimated {
  id: number;
  title: string;
  description: string;
  done: boolean;
}

export class Todo implements ITodo, Period {
  id: number = Time.now();
  title: string = "";
  description: string = "";
  estimate: number = 60;
  start: Date = Time.current();
  done: boolean = false;
  static c: Date;
  
  constructor(todo?: ITodo) {
    Object.assign(this, todo);
    this.start = new Date(this.start || Time.now()); // JavaScript stores dates as strings when serializing
  }

  get end() {
    return Todo.calculateEnd(this);
  }

  set end(end: Date) {
    this.estimate = moment
      .duration(moment(end).diff(this.start))
      .asMinutes();
  }

  get duration() {
    return Todo.estimateToDuration(this);
  }

  static estimateToDuration({ estimate }: Estimate) {
    return moment.duration(estimate, "minutes");
  }

  static calculateEnd({ start, estimate }: Estimated) {
    return moment(start)
      .add(Todo.estimateToDuration({ estimate }))
      .toDate();
  }
}

export function sortedTodoList(...todos: ITodo[]){
  return todos
    .map(todo => new Todo(todo))
    .sort((a, b) => a.start.getTime() - b.start.getTime());
}