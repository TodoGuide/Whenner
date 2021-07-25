import { assign, createMachine, EventObject } from "xstate";
import { Chronotype, defaultChronotype } from "../models/Chronotype";
import { Event } from "../models/Event";
import { defaultEvents } from "../services/EventsService";

interface ScheduleContext {
  chronotype: Chronotype;
  events: Event[];
}

interface ScheduleEvent extends EventObject {
  event: Event;
}

export const scheduleMachine = createMachine<ScheduleContext, ScheduleEvent>({
  id: "schedule",
  initial: "idle",
  context: {
    events: [...defaultEvents],
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
