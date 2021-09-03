// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright (C) 2019 James Tharpe

import { useMachine } from "@xstate/react";
import React from "react";
import Container from "react-bootstrap/Container";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { EventObject } from "xstate";
import { createAppMachine } from "./charts/app";
import AboutPage from "./components/AboutPage";
import CalendarPage from "./components/CalendarPage";
import Actions from "./components/common/Actions";
import Header from "./components/common/Header";
import Navigator from "./components/common/Navigator";
import SettingsPage from "./components/SettingsPage";
import TasksPage from "./components/TasksPage";
import { startPriorityOf } from "./models/Event";
import { earliest } from "./models/priority";
import { emptyTask, taskFrom, TaskRecord, tasksIn } from "./models/Task";
import { Store } from "./redux/store";
import { localStorageCrud } from "./services/crud/impl/local-storage";
import { defaultEvents } from "./services/EventsService";

const crud = localStorageCrud({
  key: "whenner.events",
  defaultData: defaultEvents,
});

const App: React.FC = () => {
  const [state, send, service] = useMachine(createAppMachine(crud), {
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

  console.log("<App>", { events });

  return (
    <Router>
      <Container>
        <Header />
        <Actions state={state} send={send} />
        <Navigator />
        <Provider store={Store.instance}>
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
        </Provider>
      </Container>
    </Router>
  );
};

export default App;

// TODO: Use react-testing-library
