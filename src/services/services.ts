import { SettingsService } from "./SettingsService";
import { TasksService } from "./TasksService";
import { defaultChronotype } from "../models/Chronotype";

export const settingsService = new SettingsService();

export const tasksService = new TasksService(defaultChronotype);

settingsService
  .settings()
  .then(settings => (tasksService.chronotype = settings.chronotype));
