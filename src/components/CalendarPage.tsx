// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright (C) 2019  James Tharpe

import React from "react";
import Calendar from "./calendar/Calendar";
import useTasks from "./hooks/useTasks";

const CalendarPage: React.FC = () => {
  return <Calendar tasks={useTasks()} />;
};

export default CalendarPage;
