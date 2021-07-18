import { createMachine, EventObject } from "xstate";
import { defaultAppointments } from "../models/AppointmentEvent";
import { Chronotype, defaultChronotype } from "../models/Chronotype";
import { defaultTasks } from "../models/TaskEvent";
import { Todo } from "../models/Todo";

interface ScheduleContext {
  chronotype: Chronotype;
  todos: Todo[];
}

interface ScheduleEvent extends EventObject {
  todo: Todo;
}

export const scheduleMachine = createMachine<ScheduleContext, ScheduleEvent>({
  id: "schedule",
  initial: "idle",
  context: {
    todos: [...(defaultAppointments as Todo[]), ...defaultTasks],
    chronotype: defaultChronotype,
  },
  states: {
    idle: {
      on: {
        UPSERT: {},
        REMOVE: {},
      },
    },
  },
});
