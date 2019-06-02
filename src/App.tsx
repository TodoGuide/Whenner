import React from "react";
import logo from "./logo.svg";
import "./App.css";
import TodoList from "./components/TodoList";
import { Provider } from "react-redux";
import { WhennerStore } from "./redux/store";

const App: React.FC = () => {
  return (
    <Provider store={WhennerStore.instance}>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <TodoList/>
        <pre>
          { JSON.stringify(WhennerStore.instance.getState()) }
        </pre>
      </div>
    </Provider>
  );
};

export default App;
