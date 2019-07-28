import { ScheduledTask } from "./ScheduledTask";
import { oneHourTask, twoHourTask } from "../test/data";
import { defaultChronotype } from "./Chronotype";
import { customMatchers } from "../test/matchers";
import { Time } from "./time";
import { Task } from "./Task";

describe("A ScheduledTask", () => {
  beforeEach(() => {
    jasmine.addMatchers(customMatchers);
    Time.set(new Date(2019, 6, 5, 12, 0, 0, 0)); // 2019-07-05 at Noon
  });

  describe("Given a Task", () => {
    let task: Task;
    beforeEach(() => {
      task = new Task(oneHourTask);
    });

    describe("When a ScheduledTodo is created, it...", () => {
      let scheduledTodo: ScheduledTask;
      beforeEach(() => {
        scheduledTodo = new ScheduledTask(
          defaultChronotype,
          task
        );
      });

      it("Has a start of now", () => {
        expect(scheduledTodo.start.getTime()).toEqual(Time.now());
      });
    });
  });

  describe("Given a current and previous todo", () => {
    let previous: Task, current: Task, scheduledTodo: ScheduledTask;
    beforeEach(() => {
      previous = new Task(oneHourTask);
      current = new Task(twoHourTask);
      scheduledTodo = new ScheduledTask(
        defaultChronotype,
        current,
        previous
      );
    });

    describe("When a ScheduledTodo is created, it...", () => {
      let scheduledTodo: ScheduledTask;
      beforeEach(() => {
        scheduledTodo = new ScheduledTask(
          defaultChronotype,
          current,
          previous
        );
      });

      it("Has a 'start' value equal to the previous Todo 'end' value", () => {
        expect(scheduledTodo.start.getTime()).toEqual(previous.end.getTime());
      });
    });
  });
});
