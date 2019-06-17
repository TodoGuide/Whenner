import { ITodo } from "../models/Todo";
import { Settings, defaultSettings } from "../models/Settings";

export interface State {
  settings: Settings;
  todos: ITodo[];
  // appointments: IAppointment[];
}

export const initialState: State = JSON.parse(
  localStorage.getItem("WhennerState") || "null"
) || {
  settings: defaultSettings,
  todos: [
    {
      id: Date.now(),
      title: "Get started with Whenner",
      description: "Click stuff, learn how the app works",
      estimate: 5,
      start: new Date(),
      done: false
    }
  ]
  // appointments: [] = []
};
