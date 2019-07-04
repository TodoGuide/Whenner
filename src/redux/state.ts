import { ITodo } from "../models/Todo";
import { Settings, defaultSettings } from "../models/Settings";
import { defaultTodos } from "../services/TodosService";

export interface State {
  settings: Settings;
  todos: ITodo[];
  // appointments: IAppointment[];
}

export const initialState: State = {
  settings: JSON.parse(
    localStorage.getItem("Whenner.Settings") || "null"
  ) || defaultSettings,
  todos: JSON.parse(
    localStorage.getItem("Whenner.Todos") || "null"
  ) || defaultTodos
};
