import { ITask, Task, defaultTasks } from "./Task";
import { IAppointment, Appointment, defaultAppointments } from "./Appointment";
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
    const scheduledTasks = this.tasks.map(task => new Appointment(task));
    const allItems = [...this.appointments, ...scheduledTasks];
    return inStartOrder(...allItems);
  }
}

export type TaskOrAppointment = ITask | IAppointment;

export function inStartOrder<T extends Start>(...starts: T[]) {
  return starts.sort((a, b) => a.start.getTime() - b.start.getTime());
}

export function toAppointment(task: ITask) {
  return new Appointment({ ...task, start: new Date(task.priority) });
}

export function toTask(appointment: IAppointment) {
  return new Task({
    ...appointment,
    priority: appointment.start.getTime(),
    estimate: Task.periodToEstimate(appointment)
  });
}

export const defaultSchedule: ISchedule = {
  tasks: defaultTasks,
  appointments: defaultAppointments
};
