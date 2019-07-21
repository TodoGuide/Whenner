import { IAppointment, defaultAppointments } from "./Appointment";
import { ITask, defaultTasks } from "./Task";


export interface ISchedule {
  appointments: IAppointment[];
  tasks: ITask[];
}

export const defaultSchedule: ISchedule = {
  tasks: defaultTasks,
  appointments: defaultAppointments
};