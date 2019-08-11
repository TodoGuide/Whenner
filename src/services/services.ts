import { TasksService } from "./TasksService";
import { defaultChronotype } from "../models/Chronotype";

export const tasksService = TasksService.create(defaultChronotype);