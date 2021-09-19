import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Whenner from "./ui/Whenner";
import reportWebVitals from "./reportWebVitals";
import { inspect } from "@xstate/inspect";

inspect({
  iframe: false, // open in new window
});

ReactDOM.render(
  <React.StrictMode>
    <Whenner />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
