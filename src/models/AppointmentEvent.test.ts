// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright (C) 2019  James Tharpe

import { Time } from "./time";
import { Todo } from "./Todo";
import { AppointmentEvent } from "./AppointmentEvent";
import { addHour } from "./time/utils";

describe("An Appointment", () => {
  beforeEach(() => {
    Time.set(new Date(2019, 6, 20, 13, 1, 0, 0)); // 2019-07-20 at 1:01PM
  });

  describe("Given a Todo", () => {
    let todo: Todo;
    beforeEach(() => {
      todo = {
        id: 1,
        title: "Todo Instance",
        description: "This is a valid instance of the Todo interface",
      };
    });

    describe("When the instance is passed to the Appointment constructor, it...", () => {
      let appointment: AppointmentEvent;
      beforeEach(() => {
        appointment = new AppointmentEvent(todo);
      });

      it("Assigns the Todo properties to the Appointment", () => {
        expect({ ...appointment, completed: todo.completed }).toEqual({
          ...todo,
          _completed: appointment.completed,
          start: Time.current(),
          end: addHour(Time.current()),
          completed: undefined,
        });
      });
    });
  });

  describe("Given no Todo", () => {
    describe("When nothing is passed to the Appointment constructor, it...", () => {
      let appointment: AppointmentEvent;
      beforeEach(() => {
        appointment = new AppointmentEvent();
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

      it("Defaults to incomplete", () => {
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
