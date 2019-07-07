import React from "react";
import "./App.css";
import { Provider } from "react-redux";
import { Store } from "./redux/store";
import HomePage from "./components/HomePage";

const App: React.FC = () => {
  return (
    <Provider store={Store.instance}>
      <HomePage />
    </Provider>
  );
};

export default App;
