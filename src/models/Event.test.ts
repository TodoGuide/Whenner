import { oneHourTask, pastAppointment, twoHourTask } from "../test/data";
import { incomplete, Event, completed } from "./Event";
import { Time } from "./time";

describe("The Event Module", () => {
  describe("Given a task", () => {
    describe("That is completed", () => {
      const completedTask = { ...twoHourTask, completed: Time.current() };

      it("When completed is called, it returns the completed date", () => {
        expect(completed(completedTask)).toEqual(completedTask.completed);
      });
    });

    describe("That is incomplete", () => {
      const incompleteTask = { ...twoHourTask };

      it("When completed is called, it returns falsy", () => {
        expect(completed(incompleteTask)).toBeFalsy();
      });
    });
  });

  describe("Given an appointment", () => {
    describe("That is completed (the end date is in the past)", () => {
      const completedAppointment = { ...pastAppointment };

      it("When completed is called, it returns the completed date", () => {
        expect(completed(completedAppointment)).toEqual(
          completedAppointment.end
        );
      });
    });
  });

  describe("Given a populated Event List with one incomplete task", () => {
    let events: Event[] = [
      oneHourTask,
      { ...twoHourTask, completed: Time.current() },
    ];

    it("When the todo list is passed to incomplete, it returns the incomplete items", () => {
      expect(incomplete(events)).toEqual([oneHourTask]);
    });
  });
});
