import { IAppointment, defaultAppointments } from "./Appointment";
import { ITask, defaultTasks, Task } from "./Task";
import { Start } from "./time";

export interface ISchedule {
  appointments: IAppointment[];
  tasks: ITask[];
}

export class Schedule implements ISchedule {
  appointments: IAppointment[];
  tasks: ITask[];

  constructor({ appointments, tasks }: ISchedule) {
    this.appointments = appointments;
    this.tasks = tasks;
  }

  buildSchedule() {
    // const scheduledTasks = this.tasks.map(task => new Appointment(task));
    const allItems = [
      ...this.appointments.map(appt => new Task(appt)),
      ...this.tasks
    ];
    return inStartOrder(...allItems);
  }
}

export function inStartOrder<T extends Start>(...starts: T[]) {
  return starts.sort((a, b) => a.start.getTime() - b.start.getTime());
}

export const defaultSchedule: ISchedule = {
  tasks: defaultTasks,
  appointments: defaultAppointments
};
