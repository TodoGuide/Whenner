// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright (C) 2019  James Tharpe

import { Appointment } from "./Appointment";
import { Time } from "./time";
import { TaskEvent, isTask } from "./TaskEvent";
import { Task } from "./Task";
import { add30Minutes } from "./time/utils";

describe("A TaskEvent", () => {
  beforeEach(() => {
    Time.set(new Date(2019, 6, 20, 13, 1, 0, 0)); // 2019-07-20 at 1:01PM
  });

  describe("Given a Task", () => {
    let task: Task;

    beforeEach(() => {
      task = {
        id: 1,
        title: "ITask Instance",
        description: "This is a valid instance of the ITask interface",
        priority: Time.now(),
        estimate: 1,
      };
    });

    describe("When the instance is passed to the TaskEvent constructor, it...", () => {
      let taskEvent: TaskEvent;
      beforeEach(() => {
        taskEvent = new TaskEvent(task);
      });

      it("Assigns the Task instance properties to the Task instance", () => {
        const { description, estimate, id, title, priority } = taskEvent;
        expect({
          description,
          estimate,
          id,
          title,
          priority,
        }).toEqual({ ...task, priority: Time.now() });
      });

      it("Sets the End date based on the Start and Estimate", () => {
        expect(taskEvent.end).toEqual(new Date(2019, 6, 20, 13, 2, 0, 0));
      });

      it("Sets the Priority based on the Start", () => {
        expect(taskEvent.priority).toEqual(Time.now());
      });
    });
  });

  describe("Given no Task instance", () => {
    describe("When nothing is passed to the Todo constructor, it...", () => {
      let taskEvent: TaskEvent;
      beforeEach(() => {
        taskEvent = new TaskEvent();
      });

      it("Defaults to an ID of the current date and time", () => {
        expect(taskEvent.id).toEqual(Time.now());
      });

      it("Defaults to an empty Title", () => {
        expect(taskEvent.title).toBe("");
      });

      it("Defaults to an empty Description", () => {
        expect(taskEvent.description).toBe("");
      });

      it("Defaults to incomplete", () => {
        expect(taskEvent.completed).toBeUndefined();
      });

      it("Defaults to a 60 minute Estimate", () => {
        expect(taskEvent.estimate).toBe(60);
      });

      it("Defaults to a Start of the current date-time", () => {
        expect(taskEvent.start.getTime()).toEqual(Time.now());
      });
    });
  });

  describe("Given an Appointment", () => {
    let appointment: Appointment;
    beforeEach(() => {
      appointment = {
        id: 1,
        title: "IAppointment Instance",
        description: "This is a valid instance of an IAppointment",
        start: Time.current(),
        end: add30Minutes(Time.current()),
      };
    });

    describe("When the instance is passed to the Task constructor, it...", () => {
      let taskEvent: TaskEvent;
      beforeEach(() => {
        taskEvent = new TaskEvent(appointment);
      });

      it("Assigns the ITask instance properties to the Task instance", () => {
        const { description, estimate, id, start, title, end } = taskEvent;
        expect({
          description,
          estimate: estimate || "none",
          id,
          start,
          title,
          end,
        }).toEqual({
          ...appointment,
          estimate: TaskEvent.periodToEstimate(appointment),
        });
      });

      it("Sets the End date based on the Start and Estimate", () => {
        expect(taskEvent.end).toEqual(appointment.end);
      });

      it("Sets the Priority based on the Start", () => {
        expect(taskEvent.priority).toEqual(Time.now());
      });
    });
  });
});

describe("The isTask function", () => {
  it("Returns true when given a task", () => {
    expect(isTask(new TaskEvent())).toBeTruthy();
  });

  it("Returns true when given a task with extra properties", () => {
    expect(isTask({ ...new TaskEvent(), extraProp: "Hello!" })).toBeTruthy();
  });

  it("Returns false when not given a task", () => {
    expect(isTask({ hello: "world" })).toBeFalsy();
  });

  it("Returns false when given an empty object", () => {
    expect(isTask({})).toBeFalsy();
  });
});
