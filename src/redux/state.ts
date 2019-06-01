import { ITodo } from "../model/Todo";
import { WhennerAction, WhennerActionType } from "./actions";
import { todos } from "./reducers";

export interface WhennerState {
  todos: ITodo[];
}

const initialState: WhennerState = {
  todos: [
    // {
    //   id: Date.now(),
    //   title: "Get started with Whenner",
    //   description: "Click stuff, learn how the app works",
    //   estimate: 5,
    //   start: new Date(),
    //   done: false
    // }
  ]
  // appointments: [] = []
};

export function whennerApp(
  state: WhennerState = initialState,
  action: WhennerAction
): WhennerState {
  return {
    todos: todos((state || initialState).todos, action)
  }
}
