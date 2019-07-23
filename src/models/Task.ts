import { Time, StartEstimated, Period, EndEstimated, Estimated } from "./Time";
import { Todo, EstimatedTodo } from "./Todo";
import moment, { Duration } from "moment";

export interface ITask extends Todo, StartEstimated {}

export class Task implements ITask, EndEstimated, Period {
  private _completed?: Date;
  id: number = Time.now();
  title: string = "";
  description: string = "";
  estimate: number = 60;
  start: Date = Time.current();

  constructor(todo?: ITask | EstimatedTodo | Todo) {
    Object.assign(this, todo);

    // JavaScript stores dates as strings when serializing,
    // so re-construct in case we received a string
    this.priority = new Date(this.start || this.priority || Time.now()).getTime();
    if (this._completed) {
      this._completed = new Date(this._completed);
    }
  }

  get completed() {
    return this._completed;
  }

  set completed(completed: Date | undefined) {
    const changed = this._completed !== completed;
    this._completed = completed;
    if (changed && completed) {
      this.start = Task.calculateStart(this);
    }
  }

  get duration() {
    return Task.estimateToDuration(this);
  }

  set duration(duration: Duration) {
    this.estimate = duration.asMinutes();
  }

  get end() {
    return this.completed || Task.calculateEnd(this);
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
      .add(Task.estimateToDuration({ estimate }))
      .toDate();
  }

  static calculateStart({ end, estimate }: EndEstimated) {
    return moment(end)
      .subtract(Task.estimateToDuration({ estimate }))
      .toDate();
  }

  static estimateToDuration({ estimate }: Estimated) {
    return moment.duration(estimate, "minutes");
  }

  static periodToEstimate({ start, end }: Period){
    return moment.duration(moment(end).diff(start)).asMinutes();
  }
}

export function isTask(thing: any){
  try {
    const taskProperties = Object.keys(new Task());
    const thingProperties = Object.keys(thing);
    return taskProperties.every(property => thingProperties.indexOf(property) >= 0)
  }catch {
    return false;
  }
}

export const defaultTasks: ITask[] = [
  new Task({
    id: 1,
    title: "Get started with Whenner",
    description: "Click stuff, learn how the app works",
    estimate: 5,
    priority: Time.now()
  })
];