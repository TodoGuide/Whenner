import moment from "moment";

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

  static estimateToDuration({ estimate }: { estimate: number }) {
    return moment.duration(estimate, "minutes");
  }

  static calculateEnd({ start, estimate }: ITodo) {
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