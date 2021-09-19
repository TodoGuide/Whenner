// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright (C) 2019 James Tharpe

import { useMachine } from "@xstate/react";
import React from "react";
import Container from "react-bootstrap/Container";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { EventObject } from "xstate";
import AboutPage from "./components/AboutPage";
import CalendarPage from "./components/CalendarPage";
import Actions from "./components/common/Actions";
import Header from "./components/common/Header";
import Navigator from "./components/common/Navigator";
import SettingsPage from "./components/SettingsPage";
import TasksPage from "./components/TasksPage";
import { localStorageCrud } from "./crud.local-storage";
import { defaultEvents } from "./data/defaults";
import { TaskRecord, tasksIn } from "./task";
import { createWhennerMachine } from "./whenner.state";

const crud = localStorageCrud({
  key: "whenner.events",
  defaultData: defaultEvents,
});

const Whenner: React.FC = () => {
  const [state, send, service] = useMachine(createWhennerMachine(crud), {
    devTools: true,
  });

  const logEvent = (name: string) => (event: EventObject) =>
    console.log(name, event);

  service
    // .onChange((context, prev) => console.log("onChange", { context, prev }))
    .onDone(logEvent("onDone"))
    // .onEvent(logEvent("onEvent"))
    .onSend(logEvent("onSend"))
    .onStop(() => console.log("onStop"))
    .onTransition((state, event) =>
      console.log("onTransition", { state, event })
    );

  const { events } = state.context;

  console.log("<Whenner>", { events });

  return (
    <Router>
      <Container>
        <Header />
        <Actions state={state} send={send} />
        <Navigator />
        <Route
          path="/"
          exact
          render={() => (
            <TasksPage
              tasks={tasksIn(events) as Array<TaskRecord>}
              taskId={0}
            />
          )}
        />
        <Route path="/calendar/" component={CalendarPage} />
        <Route path="/settings/" component={SettingsPage} />
        <Route path="/about/" component={AboutPage} />
      </Container>
    </Router>
  );
};

export default Whenner;

// TODO: Use react-testing-library
