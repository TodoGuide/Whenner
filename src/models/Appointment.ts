import { Todo } from "./Todo";
import { Period, Time, addHour } from "./time";

export interface IAppointment extends Todo, Period {

}

export class Appointment implements IAppointment {
  completed?: Date;
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
}
