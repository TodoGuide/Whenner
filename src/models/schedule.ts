import { ITask } from "./Task";
import { IAppointment, Appointment } from "./Appointment";
import { inPriorityOrder } from "./Todo";


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
    const all = inPriorityOrder(...[ ...this.appointments, ...this.tasks ]);
  }
}