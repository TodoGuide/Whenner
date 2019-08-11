import { TasksService } from "./TasksService";
import { defaultChronotype } from "../models/Chronotype";
import { AppointmentsService } from "./AppointmentsService";

export const tasksService = TasksService.create(defaultChronotype);
export const appointmentsService = AppointmentsService.create();