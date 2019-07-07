import "../App.css";

import React from "react";
import logo from "../logo.svg";
import TodoList from "./TodoList";

const HomePage: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img
          src={logo}
          className="App-logo"
          style={{ display: "none" }}
          alt="logo"
        />
        <h1 className="App-title">Whenner!</h1>
        <p>Answer "when 're you gonna be done" like a Winner!</p>
      </header>
      <TodoList />
    </div>
  );
};

export default HomePage;
