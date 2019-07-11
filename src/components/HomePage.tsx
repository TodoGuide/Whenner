import React from "react";
import TodoList from "./TodoList";
import Header from "./common/Header";

const HomePage: React.FC = () => {
  return (
    <div>
      <Header />
      <TodoList />
    </div>
  );
};

export default HomePage;
