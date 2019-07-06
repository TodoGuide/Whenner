import { ScheduledTodo } from "./ScheduledTodo";
import { ITodo, Todo } from "./Todo";
import { oneHourTodo, twoHourTodo } from "../test/data";
import { defaultChronotype, Chronotype } from "./Chronotype";
import { customMatchers } from "../test/matchers";
import { Time } from "./time";

describe("The ScheduledTodo class", () => {
  beforeEach(() => {
    jasmine.addMatchers(customMatchers);
    Time.current = () => new Date(2019, 6, 5, 12, 0, 0, 0); // 2019-07-05 at Noon
    Time.now = () => Time.current().getTime();
  });

  describe("Given a current Todo", () => {
    let current: Todo;
    beforeEach(() => {
      current = new Todo(oneHourTodo);
    });

    describe("When a ScheduledTodo is created, it...", () => {
      let scheduledTodo: ScheduledTodo;
      beforeEach(() => {
        scheduledTodo = new ScheduledTodo(
          new Chronotype(defaultChronotype),
          current
        );
      });

      it("Has a start of now", () => {
        expect(scheduledTodo.start.getTime()).toEqual(Time.now());
      });
    });
  });

  describe("Given a current and previous todo", () => {
    let previous: Todo, current: Todo, scheduledTodo: ScheduledTodo;
    beforeEach(() => {
      previous = new Todo(oneHourTodo);
      current = new Todo(twoHourTodo);
      scheduledTodo = new ScheduledTodo(
        new Chronotype(defaultChronotype),
        current,
        previous
      );
    });

    describe("When a ScheduledTodo is created, it...", () => {
      let scheduledTodo: ScheduledTodo;
      beforeEach(() => {
        scheduledTodo = new ScheduledTodo(
          new Chronotype(defaultChronotype),
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
