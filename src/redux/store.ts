import { createStore } from "redux";
import { whennerApp } from "./state";

export const whennerStore = createStore(
  whennerApp,
  JSON.parse(localStorage.getItem("todos") || "null")
);
