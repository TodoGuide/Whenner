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
  constructor(
    public title: string,
    public description: string,
    public estimate: number,
    public start: Date = new Date(),
    public done = false,
    public id = Date.now()
  ) {}

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
