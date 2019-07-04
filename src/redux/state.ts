import { ITodo } from "../models/Todo";
import { Settings } from "../models/Settings";
import { defaultTodos, TODOS_KEY } from "../services/TodosService";
import { defaultSettings, SETTINGS_KEY } from "../services/SettingsService";

export interface State {
  settings: Settings;
  todos: ITodo[];
  // appointments: IAppointment[];
}

export const initialState: State = {
  settings: JSON.parse(
    localStorage.getItem(SETTINGS_KEY) || "null"
  ) || defaultSettings,
  todos: JSON.parse(
    localStorage.getItem(TODOS_KEY) || "null"
  ) || defaultTodos
};
