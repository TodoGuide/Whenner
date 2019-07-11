import React from "react";
import { Provider } from "react-redux";
import { Store } from "./redux/store";
import HomePage from "./components/HomePage";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AboutPage from "./components/AboutPage";
import Container from "react-bootstrap/Container";

const App: React.FC = () => {
  return (
    <Provider store={Store.instance}>
      <Router>
        <Container>
          <Route path="/" exact component={HomePage} />
          <Route path="/about/" component={AboutPage} />
        </Container>
      </Router>
    </Provider>
  );
};

export default App;
