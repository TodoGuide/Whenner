import { defaultAppointments } from "./Appointment";
import { incomplete, Event } from "./Event";
import { defaultTasks } from "./Task";

describe("The Event Module", () => {
  describe("Given a populated Event List with one incomplete item", () => {
    let events: Event[];
    beforeEach(() => {
      events = [...defaultTasks, ...defaultAppointments];
    });

    it("When the todo list is passed to incomplete, it returns the incomplete items", () => {
      expect(incomplete(events)).toEqual([defaultTasks[1]]);
    });
  });
});
