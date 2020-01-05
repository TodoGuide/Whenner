import React from "react";
import { Task } from "../../models/Task";
import { Appointment } from "../../models/Appointment";
import {
  Chronotype,
  defaultChronotype,
  startOf,
  endOf
} from "../../models/Chronotype";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { Time } from "../../models/time";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import { TaskEvent } from "../../models/TaskEvent";
import { AppointmentEvent } from "../../models/AppointmentEvent";
import { allTestDataTasks } from "../../test/data/tasks";

import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

moment.locale(navigator.language, {
  week: {
    // Always start the week "yesterday"
    dow: Time.yesterday().getDay(),
    doy: 1
  }
});

const localizer = momentLocalizer(moment); // or globalizeLocalizer
const DnDCalendar = withDragAndDrop(BigCalendar);

interface CalendarStateProps {
  tasks?: Task[];
  appointments?: Appointment[];
  chronotype?: Chronotype;
}

const Calendar: React.FC<CalendarStateProps> = ({
  tasks = allTestDataTasks,
  appointments = [],
  chronotype = defaultChronotype
}: CalendarStateProps) => {
  const events = [
    ...tasks.map(task => new TaskEvent(task)),
    ...appointments.map(appointment => new AppointmentEvent(appointment))
  ];

  return (
    <DnDCalendar
      defaultDate={Time.current()}
      defaultView="week"
      events={events}
      getNow={Time.current}
      localizer={localizer}
      max={endOf(Time.current(), chronotype)}
      min={startOf(Time.current(), chronotype)}
      selectable
      step={15}
    />
  );
};

export default Calendar;
