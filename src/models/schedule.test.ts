import { schedule } from "./schedule";
import { defaultSettings, Settings } from "./Settings";
import { Todo } from "./Todo";
import moment from "moment";
import { oneHourTodo, twoHourTodo } from "./testData";

describe("The schedule method", () => {
  describe("Given two NOT done todos", () => {
    const twoNotDoneTodos = [
      {
        id: 1,
        title: "ITodo Instance One",
        description: "",
        estimate: 1,
        start: new Date(2019, 6, 15, 8, 53, 52, 51),
        done: false
      },
      {
        id: 2,
        title: "ITodo Instance Two",
        description: "",
        estimate: 1,
        start: new Date(2019, 6, 15, 8, 54, 53, 52),
        done: false
      }
    ];

    describe("When the schedule method is called", () => {
      const scheduledTodos = schedule(defaultSettings, ...twoNotDoneTodos);

      it("Schedules the higher priority Todo for the current datetime", () => {
        expect(scheduledTodos[0].start.getTime()).toBeLessThanOrEqual(
          Date.now()
        );
        expect(scheduledTodos[0].start.getTime()).toBeGreaterThanOrEqual(
          Date.now() - 100
        );
      });

      it("Schedules the lower priority Todo to immedietly follow the higher priority item", () => {
        expect(scheduledTodos[1].start.getTime()).toBe(
          Todo.calculateEnd(scheduledTodos[0]).getTime()
        );
      });
    });
  });

  describe("Given a 1 hour Day Start to Day End window", () => {
    const oneHourWindow: Settings = {
      dayStart: moment.duration("0:00"),
      dayEnd: moment.duration("1:00")
    };

    const today = new Date(new Date().setHours(0, 0, 0, 0));
    const tomorrow = new Date(today.getTime() + (24 * 60 * 60 * 1000));
    const dayAfterTomorrow = new Date(tomorrow.getTime() + (24 * 60 * 60 * 1000));

    describe("AND a 2-hour Todo", () => {
      describe("When schedule is called, it..", () => {
        const scheduledTodos = schedule(oneHourWindow, twoHourTodo);
        it("Schedules the Todo for the current datetime", () => {
          expect(scheduledTodos[0].start.getTime()).toBeLessThanOrEqual(
            Date.now()
          );
          expect(scheduledTodos[0].start.getTime()).toBeGreaterThanOrEqual(
            Date.now() - 100
          );
        });
      });
    });

    describe("AND a 1-hour Todo", () => {
      describe("When schedule is called, it..", () => {
        const scheduledTodos = schedule(oneHourWindow, oneHourTodo);
        it("Schedules the Todo for tomorrow", () => {
          expect(scheduledTodos[0].start).toEqual(tomorrow);
        });
      });
    });

    describe("AND 2 1-hour Todos", () => {
      describe("When schedule is called, it..", () => {
        const scheduledTodos = schedule(
          oneHourWindow,
          Object.assign({}, oneHourTodo),
          Object.assign({}, oneHourTodo)
        );

        it("Schedules the higher priority Todo for tomorrow", () => {
          expect(scheduledTodos[0].start).toEqual(tomorrow);
        });

        it("Schedules the lower priority Todo for the day after tomorrow", () => {
          expect(scheduledTodos[1].start).toEqual(dayAfterTomorrow);
        });
      });
    });
  });
});
