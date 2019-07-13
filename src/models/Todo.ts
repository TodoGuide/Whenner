import moment from "moment";
import { Time, Estimated, Period, EndEstimated, StartEstimated } from "./time";

export interface ITodo extends StartEstimated {
  id: number;
  title: string;
  description: string;
  done?: Date;
  // Predecessors: number[];
}

export class Todo implements ITodo, Period {
  id: number = Time.now();
  title: string = "";
  description: string = "";
  estimate: number = 60;
  start: Date = Time.current();
  done?: Date;
  
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

  static estimateToDuration({ estimate }: Estimated) {
    return moment.duration(estimate, "minutes");
  }

  static calculateStart({ end, estimate }: EndEstimated) {
    return moment(end)
      .subtract(Todo.estimateToDuration({ estimate }))
      .toDate();
  }

  static calculateEnd({ start, estimate }: StartEstimated) {
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