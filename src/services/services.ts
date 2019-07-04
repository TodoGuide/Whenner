import { SettingsService } from "./SettingsService";
import { TodosService } from "./TodosService";
import { defaultChronotype } from "../models/Chronotype";

export const settingsService = new SettingsService();

export const todosService = new TodosService(defaultChronotype);

settingsService
  .settings()
  .then(settings => (todosService.chronotype = settings.chronotype));
