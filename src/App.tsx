import React from "react";
import logo from "./logo.svg";
import "./App.css";
import TodoList from "./components/TodoList";
import { Provider } from "react-redux";
import { Store } from "./redux/store";

const App: React.FC = () => {
  return (
    <Provider store={Store.instance}>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" style={{ display: 'none' }} alt="logo" />
          <h1 className="App-title">Whenner!</h1>
          <p>Answer "when 're you gonna be done" like a Winner!</p>
        </header>
        <TodoList />
      </div>
    </Provider>
  );
};

export default App;
