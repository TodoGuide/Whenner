import { ITodo } from "../models/Todo";
import { WhennerAction } from "./actions";
import { todos } from "./reducers";

export interface WhennerState {
  todos: ITodo[];
}

const initialState: WhennerState = JSON.parse(
  localStorage.getItem("WhennerState") || "null"
) || {
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
  console.log("Old State", state);
  const result = {
    todos: todos((state || initialState).todos, action)
  };
  console.log("New State", result);
  localStorage.setItem("WhennerState", JSON.stringify(result));
  return result;
}
