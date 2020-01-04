// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright (C) 2019  James Tharpe

import { ScheduledTask } from "./ScheduledTask";
import { oneHourTask, twoHourTask } from "../test/data";
import { defaultChronotype } from "./Chronotype";
import { customMatchers } from "../test/matchers";
import { Time } from "./time";
import { TaskEvent } from "./TaskEvent";

describe("A ScheduledTask", () => {
  beforeEach(() => {
    jasmine.addMatchers(customMatchers);
    Time.set(new Date(2019, 6, 5, 12, 0, 0, 0)); // 2019-07-05 at Noon
  });

  describe("Given a Task", () => {
    let task: TaskEvent;
    beforeEach(() => {
      task = new TaskEvent(oneHourTask);
    });

    describe("When a ScheduledTodo is created, it...", () => {
      let scheduledTodo: ScheduledTask;
      beforeEach(() => {
        scheduledTodo = new ScheduledTask(defaultChronotype, task);
      });

      it("Has a start of now", () => {
        expect(scheduledTodo.start.getTime()).toEqual(Time.now());
      });
    });
  });

  describe("Given a current and previous todo", () => {
    let previous: TaskEvent, current: TaskEvent;
    beforeEach(() => {
      previous = new TaskEvent({ ...oneHourTask, priority: Time.now() - 1 });
      current = new TaskEvent({ ...twoHourTask, priority: Time.now() });
    });

    describe("When a ScheduledTodo is created, it...", () => {
      let scheduledTodo: ScheduledTask;
      beforeEach(() => {
        scheduledTodo = new ScheduledTask(defaultChronotype, current, previous);
      });

      it("Has a 'start' value equal to the previous Todo 'end' value", () => {
        expect(scheduledTodo.start.getTime()).toEqual(previous.end.getTime());
      });
    });
  });
});
