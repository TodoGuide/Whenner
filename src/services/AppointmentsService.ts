import { localStorageCrud } from "./crud/local-storage";
import { Crud } from "./crud";
import { Appointment } from "../models/Appointment";
import { defaultAppointments } from "../models/AppointmentEvent";

export const APPOINTMENTS_KEY = "Whenner.Appointments";

export class AppointmentsService {
  static create(): Crud<Appointment> {
    return localStorageCrud({
      key: APPOINTMENTS_KEY,
      initialData: defaultAppointments
    });
  }
}
