import React from "react";
import Calendar from "./Calendar";
import Header from "./common/Header";

const HomePage: React.FC = () => {
  return (
    <div>
      <Header />
      <Calendar />
    </div>
  );
};

export default HomePage;
