// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright (C) 2019  James Tharpe

import React from "react";
import { Provider } from "react-redux";
import { Store } from "./redux/store";
import CalendarPage from "./components/CalendarPage";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AboutPage from "./components/AboutPage";
import Container from "react-bootstrap/Container";
import SettingsPage from "./components/SettingsPage";
import Header from "./components/common/Header";
import TasksPage from "./components/TasksPage";
import { useMachine } from "@xstate/react";
import { localStorageCrud } from "./services/crud/local-storage";
import { createRecordSetMachine } from "./services/crud/record";
import { defaultEvents } from "./services/EventsService";

const crud = localStorageCrud({
  key: "whenner.events",
  initialData: defaultEvents,
});

const App: React.FC = () => {
  useMachine(createRecordSetMachine(crud), {
    devTools: true,
  });
  return (
    <Router>
      <Container>
        <Header />
        <Provider store={Store.instance}>
          <Route path="/" exact component={TasksPage} />
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
