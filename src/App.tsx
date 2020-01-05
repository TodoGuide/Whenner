// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright (C) 2019  James Tharpe

import React from "react";
import { Provider } from "react-redux";
import { Store } from "./redux/store";
import CalendarPage from "./components/CalendarPage";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import AboutPage from "./components/AboutPage";
import Container from "react-bootstrap/Container";
import SettingsPage from "./components/SettingsPage";
import Header from "./components/common/Header";
import TasksPage from "./components/TasksPage";
import TaskPage from "./components/TaskPage";

const App: React.FC = () => {
  return (
    <Router>
      <Container>
        <Header />
        <Provider store={Store.instance}>
          <Route path="/" exact>
            {/* TODO: Make redirect to tasks or calendar page a setting */}
            <Redirect to="/tasks" />
          </Route>
          <Route path="/tasks" exact component={TasksPage} />
          <Route path="/tasks/:id" component={TaskPage} />
          <Route path="/calendar/" component={CalendarPage} />
          <Route path="/settings/" component={SettingsPage} />
          <Route path="/about/" component={AboutPage} />
        </Provider>
      </Container>
    </Router>
  );
};

export default App;
