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
}

export function schedule(...todos: ITodo[]): ITodo[] {
  console.log("Scheduling todos", todos);
  const result = todos.map(todo => new Todo(todo));
  const notDone = result
    .filter(todo => !todo.done)
    .sort((a, b) => a.start.getTime() - b.start.getTime());

  const lastIndex = notDone.length - 1;
  if (lastIndex === -1) return result;

  console.log("Rescheduling incomplete todos", notDone);

  let nextDay = moment().add(1, "day").startOf("day").toDate();

  console.log("Adjusting first item start", { from: notDone[0].start, to: new Date() });
  notDone[0].start = new Date();

  for (let i = 0; i <= lastIndex; i++) {
    const current = notDone[i];

    if (current.end >= nextDay && current.start < nextDay) {
      current.start = nextDay;
      nextDay = moment(nextDay).add(1, "day").startOf("day").toDate();
    }
    if (i < lastIndex) {
      notDone[i + 1].start = current.end;
    }
  }

  console.log("Scheduled todos", result);
  return result;
}
