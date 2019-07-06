import { Time } from "./time";
import { schedule } from "./schedule";
import { Todo, ITodo } from "./Todo";
import moment from "moment";
import { oneHourTodo, twoHourTodo } from "../test/data";
import { customMatchers } from "../test/matchers";
import { IChronotype, defaultChronotype } from "./Chronotype";

describe("The schedule method", () => {
  beforeEach(() => {
    jasmine.addMatchers(customMatchers);
    Time.set(new Date(2019, 6, 5, 12, 0, 0, 0)); // 2019-07-05 at Noon
  });

  describe("Given two NOT done todos", () => {
    const twoNotDoneTodos = [
      {
        id: 1,
        title: "ITodo Instance One",
        description: "",
        estimate: 1,
        start: new Date(2019, 5, 15, 8, 53, 52, 51),
        done: false
      },
      {
        id: 2,
        title: "ITodo Instance Two",
        description: "",
        estimate: 1,
        start: new Date(2019, 5, 15, 8, 54, 53, 52),
        done: false
      }
    ];

    describe("When the schedule method is called", () => {
      let scheduledTodos: ITodo[];

      beforeEach(() => {
        scheduledTodos = schedule(defaultChronotype, ...twoNotDoneTodos);
      });

      it("Schedules the higher priority Todo for the current date and time", () => {
        expect(scheduledTodos[0].start.getTime()).toEqual(Time.now());
      });

      it("Schedules the lower priority Todo to immediately follow the higher priority item", () => {
        expect(scheduledTodos[1].start.getTime()).toBe(
          Todo.calculateEnd(scheduledTodos[0]).getTime()
        );
      });
    });
  });

  describe("Given a 1 hour Chronotype from midnight to 1AM", () => {
    const oneHourWindow: IChronotype = {
      start: moment.duration("0:00"),
      end: moment.duration("1:00")
    };

    describe("AND a 2-hour Todo", () => {
      describe("When schedule is called, it..", () => {
        let scheduledTodos: ITodo[];
        beforeEach(() => {
          scheduledTodos = schedule(oneHourWindow, twoHourTodo);
        });

        it("Schedules the Todo for the current date and time", () => {
          expect(scheduledTodos[0].start.getTime()).toEqual(Time.now());
        });
      });
    }); 

    describe("AND a 1-hour Todo", () => {
      describe("When schedule is called, it..", () => {
        let scheduledTodos: ITodo[];
        beforeEach(() => {
          scheduledTodos = schedule(oneHourWindow, oneHourTodo);          
        });

        it("Schedules the Todo for tomorrow", () => {
          expect(scheduledTodos[0].start).toEqual(Time.tomorrow());
        });
      });
    });

    describe("AND 2 1-hour Todos", () => {
      describe("When schedule is called, it..", () => {
        let scheduledTodos: ITodo[];
        beforeEach(() => {
          console.log("When schedule is called, beforeEach");
          scheduledTodos = schedule(
            oneHourWindow,
            { ...oneHourTodo },
            { ...oneHourTodo }
          );
        });

        it("Schedules the higher priority Todo for tomorrow", () => {
          expect(scheduledTodos[0].start).toEqual(Time.tomorrow());
        }); 

        it("Schedules the lower priority Todo for the day after tomorrow", () => {
          expect(scheduledTodos[1].start).toEqual(Time.dayAfterTomorrow());
        });
      });
    });
  });
});
