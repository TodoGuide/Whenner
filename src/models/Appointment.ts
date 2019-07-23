import { Todo } from "./Todo";
import { Period, Time, addHour } from "./Time";

export interface IAppointment extends Todo, Period {

}

export class Appointment implements IAppointment {
  _completed?: Date;
  description: string = "";
  end: Date = addHour(Time.current());
  id: number = Time.now();
  priority: number = Time.now();
  start: Date = Time.current();
  title: string = "";

  constructor(todo?: IAppointment | Todo){
    Object.assign(this, todo);

    // JavaScript stores dates as strings when serializing,
    // so re-construct in case we received a string
    this.start = new Date(this.start);
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
}

export const defaultAppointments: Appointment[] = [
  {
    id: Time.now(),
    title: "Call someone you love",
    description: "Let them know how much you appreciate them",
    priority: Time.now(),
    start: addHour(Time.current()),
    end: addHour(addHour(Time.current())),
    completed: undefined
  }
]