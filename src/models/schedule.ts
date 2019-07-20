import { ITask } from "./Task";
import { IAppointment, Appointment } from "./Appointment";
import { inPriorityOrder } from "./Todo";
import { Start } from "./time";


export interface ISchedule {
  appointments: IAppointment[];
  tasks: ITask[];
}

export class Schedule implements ISchedule {
  appointments: IAppointment[];
  tasks: ITask[];

  constructor({appointments, tasks}: ISchedule){
    this.appointments = appointments;
    this.tasks = tasks;
  }

  buildSchedule(){
    const scheduledTasks = this.tasks.map(task => new Appointment(task));
    const allItems = [ ...this.appointments, ...scheduledTasks ]
    const all = inStartOrder(...allItems);
  } 
}

export function inStartOrder<T extends Start>(...starts: T[]) {
  return starts.sort((a, b) => a.start.getTime() - b.start.getTime());
}

export function toAppointment(task: ITask){
  return new Appointment(task);
}