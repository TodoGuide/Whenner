// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright (C) 2019 James Tharpe

import { useMachine } from "@xstate/react";
import React from "react";
import Container from "react-bootstrap/Container";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AboutPage from "./components/AboutPage";
import CalendarPage from "./components/CalendarPage";
import Header from "./components/common/Header";
import Actions from "./components/common/Actions";
import Navigator from "./components/common/Navigator";
import SettingsPage from "./components/SettingsPage";
import TasksPage from "./components/TasksPage";
import { emptyTask, taskFrom, TaskRecord, tasksIn } from "./models/Task";
import { Store } from "./redux/store";
import { localStorageCrud } from "./services/crud/impl/local-storage";
import { createRecordSetMachine } from "./services/crud/record-set";
import { defaultEvents } from "./services/EventsService";
import { earliest } from "./models/priority";
import { startPriorityOf } from "./models/Event";

const crud = localStorageCrud({
  key: "whenner.events",
  defaultData: defaultEvents,
});

const App: React.FC = () => {
  const [state, send] = useMachine(createRecordSetMachine(crud, "Event"), {
    devTools: true,
  });

  console.log("<App>", { state });

  const { records: events } = state.context;

  const handleIncludeTask = (
    record = taskFrom({
      ...emptyTask,
      priority: earliest(startPriorityOf, events) - 1,
    })
  ) => {
    console.log("handleIncludeTask", { record });
    send({ type: "INCLUDE_RECORD", record });
  };

  return (
    <Router>
      <Container>
        <Header />
        <Actions onIncludeTask={handleIncludeTask} />
        <Navigator />
        <Provider store={Store.instance}>
          <Route
            path="/"
            exact
            render={() => (
              <TasksPage tasks={tasksIn(events) as Array<TaskRecord>} />
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
