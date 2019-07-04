import { ITodo } from "../models/Todo";
import { Settings } from "../models/Settings";
import { defaultTodos } from "../services/TodosService";
import { defaultSettings } from "../services/SettingsService";

export interface State {
  settings: Settings;
  todos: ITodo[];
  // appointments: IAppointment[];
}

export const initialState: State = {
  settings: defaultSettings,
  todos: defaultTodos
};
