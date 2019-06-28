import { ITodo } from "../models/Todo";
import { Settings, defaultSettings } from "../models/Settings";
import { defaultTodos } from "../services/TodosService";

export interface State {
  settings: Settings;
  todos: ITodo[];
  // appointments: IAppointment[];
}

export const initialState: State = JSON.parse(
  localStorage.getItem("WhennerState") || "null"
) || {
  settings: defaultSettings,
  todos: defaultTodos
  // appointments: [] = []
};
