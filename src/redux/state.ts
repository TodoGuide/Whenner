import { ITodo } from "../models/Todo";
import { todos, settings } from "./reducers";
import { Settings, defaultSettings } from "../models/Settings";
import { WhennerAction } from "./actions/WhennerAction";

export interface WhennerState {
  settings: Settings;
  todos: ITodo[];
  // appointments: IAppointment[];
}

const initialState: WhennerState = JSON.parse(
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

export function whennerApp(
  state: WhennerState = initialState,
  action: WhennerAction
): WhennerState {
  // console.log("Old State", state);
  const settingsState = (state || initialState).settings;
  const result = {
    todos: todos((state || initialState).todos, settingsState, action),
    settings: settings(settingsState, action)
  };
  // console.log("New State", result);
  localStorage.setItem("WhennerState", JSON.stringify(result));
  return result;
}
