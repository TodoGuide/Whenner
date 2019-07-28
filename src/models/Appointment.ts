import { Todo } from "./Todo";
import { Time } from "./time";
import { Period } from "./time/Period";
import { addHour } from "./time/utils";

export interface IAppointment extends Todo, Period {

}

export class Appointment implements IAppointment {
  _completed?: Date;
  description: string = "";
  end: Date = addHour(Time.current());
  id: number = Time.now();
  start: Date = Time.current();
  title: string = "";

  constructor(todo?: IAppointment | Todo){
    Object.assign(this, todo);

    // JavaScript stores dates as strings when serializing,
    // so re-construct in case we received a string
    this.start = new Date(this.start || this.priority);
    this.end = new Date(this.end);
  }

  get completed() {
    if(!this._completed && this.end <= Time.current()){
      this._completed = this.end;
    }
    return this._completed;
  }

  set completed(completed: Date | undefined){
    this._completed = completed;
  }

  get priority() {
    console.log("Appointment, read priority", this.start.getDate());
    return this.start.getTime();
  }

  set priority(priority: number) {
    this.start = new Date(priority);
  }
}

export const defaultAppointments: Appointment[] = [
  {
    id: Time.now(),
    title: "Call someone you love",
    description: "Let them know how much you appreciate them",
    priority: addHour(Time.current()).getTime(),
    start: addHour(Time.current()),
    end: addHour(addHour(Time.current())),
    completed: undefined
  }
]