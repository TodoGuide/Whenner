import { IChronotype } from "../models/Chronotype";
import { LocalStorageCrudService } from "./LocalStorageCrudService";
import { IAppointment, defaultAppointments } from "../models/Appointment";

export const APPOINTMENTS_KEY = "Whenner.Appointments";

export class AppointmentsService extends LocalStorageCrudService<IAppointment[]> {
  constructor(public chronotype: IChronotype) {
    super(APPOINTMENTS_KEY, defaultAppointments);
  }
}
