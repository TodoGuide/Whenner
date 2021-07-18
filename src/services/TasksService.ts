import { Chronotype } from "../models/Chronotype";
import { defaultTasks } from "../models/Task";
import { localStorageCrud } from "./crud/local-storage";
import { Crud } from "./crud";
import { schedule } from "../models/Schedule";
import { Event } from "../models/Event";
import { defaultAppointments } from "../models/Appointment";

export const EVENTS_KEY = "Whenner.Events";

export class EventsService {
  static create(chronotype: Chronotype): Crud<Event> {
    const result = {
      ...localStorageCrud({
        key: EVENTS_KEY,
        initialData: [...defaultTasks, ...defaultAppointments],
      }),
    };
    const { read, find } = result;
    result.read = async () => schedule(await read(), chronotype).events;
    result.find = async (id: number) => find(id, await result.read());
    return result;
  }
}
