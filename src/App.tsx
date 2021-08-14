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
import SettingsPage from "./components/SettingsPage";
import TasksPage from "./components/TasksPage";
import { TaskRecord, tasksIn } from "./models/Task";
import { Store } from "./redux/store";
import { localStorageCrud } from "./services/crud/impl/local-storage";
import { createRecordSetMachine } from "./services/crud/record-set";
import { defaultEvents } from "./services/EventsService";

const crud = localStorageCrud({
  key: "whenner.events",
  defaultData: defaultEvents,
});

const App: React.FC = () => {
  const [state] = useMachine(createRecordSetMachine(crud, "Event"), {
    devTools: true,
  });
  return (
    <Router>
      <Container>
        <Header />
        <Provider store={Store.instance}>
          <Route
            path="/"
            exact
            render={() => (
              <TasksPage
                tasks={tasksIn(state.context.records) as Array<TaskRecord>}
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
