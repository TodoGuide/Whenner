import { customMatchers } from "../test/matchers";
import { Time, addHour } from "./time";
import { Todo } from "./Todo";
import { Appointment } from "./Appointment";
import moment from "moment";

describe("An Appointment", () => {
  beforeEach(() => {
    jasmine.addMatchers(customMatchers);
    Time.set(new Date(2019, 6, 20, 13, 1, 0, 0)); // 2019-07-20 at 1:01PM
  });

  describe("Given a Todo", () => {
    let todo: Todo;
    beforeEach(() => {
      todo = {
        id: 1,
        title: "Todo Instance",
        description: "This is a valid instance of the Todo interface",
        priority: 1
      };
    });

    describe("When the instance is passed to the Appointment constructor, it...", () => {
      let appointment: Appointment;
      beforeEach(() => {
        appointment = new Appointment(todo);
      });

      it("Assigns the Todo properties to the Appointment", () => {
        expect({ ...appointment }).toEqual({
          ...todo,
          start: Time.current(),
          end: addHour(Time.current()),
          completed: undefined
        });
      });
    });
  });

  describe("Given no Todo", () => {
    describe("When nothing is passed to the Appointment constructor, it...", () => {
      let appointment: Appointment;
      beforeEach(() => {
        appointment = new Appointment();
      });

      it("Defaults to an ID of the current date and time", () => {
        expect(appointment.id).toEqual(Time.now());
      });

      it("Defaults to an empty Title", () => {
        expect(appointment.title).toBe("");
      });

      it("Defaults to an empty Description", () => {
        expect(appointment.description).toBe("");
      });

      it("Defaults to incompleted", () => {
        expect(appointment.completed).toBeUndefined();
      });

      it("Defaults to Start at the current time", () => {
        expect(appointment.start).toEqual(Time.current());
      });

      it("Defaults to End in one hour", () => {
        expect(appointment.end).toEqual(addHour(appointment.start));
      });
    });
  });
});
