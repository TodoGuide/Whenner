import { Time } from "./time";
import { schedule } from "./scheduler";
import moment from "moment";
import { oneHourTask, twoHourTask } from "../test/data";
import { customMatchers } from "../test/matchers";
import { Chronotype, defaultChronotype } from "./Chronotype";
import { TaskEvent } from "./TaskEvent";
import { Task } from "./Task";

describe("The schedule method", () => {
  beforeEach(() => {
    jasmine.addMatchers(customMatchers);
    Time.set(new Date(2019, 6, 5, 12, 0, 0, 0)); // 2019-07-05 at Noon
  });

  describe("Given two incomplete tasks", () => {
    const twoNotDoneTasks = [
      {
        id: 1,
        title: "ITask Instance One",
        description: "",
        estimate: 1,
        start: new Date(2019, 5, 15, 8, 53, 52, 51),
        priority: 1,
        done: false
      },
      {
        id: 2,
        title: "ITask Instance Two",
        description: "",
        estimate: 1,
        start: new Date(2019, 5, 15, 8, 54, 53, 52),
        priority: 2,
        done: false
      }
    ];

    describe("When the schedule method is called", () => {
      let scheduledTasks: TaskEvent[];

      beforeEach(() => {
        scheduledTasks = schedule(defaultChronotype, ...twoNotDoneTasks) as TaskEvent[];
      });

      it("Schedules the higher priority Todo for the current date and time", () => {
        expect(scheduledTasks[0].start.getTime()).toEqual(Time.now());
      });

      it("Schedules the lower priority Todo to immediately follow the higher priority item", () => {
        expect(scheduledTasks[1].start.getTime()).toBe(
          TaskEvent.calculateEnd(scheduledTasks[0]).getTime()
        );
      });
    });
  });

  describe("Given a 1 hour Chronotype from midnight to 1AM", () => {
    const oneHourWindow: Chronotype = {
      start: moment.duration("0:00"),
      end: moment.duration("1:00")
    };

    describe("AND a 2-hour Todo", () => {
      describe("When schedule is called, it..", () => {
        let scheduledTasks: TaskEvent[];
        beforeEach(() => {
          scheduledTasks = schedule(oneHourWindow, twoHourTask) as TaskEvent[];
        });

        it("Schedules the Todo for the current date and time", () => {
          expect(scheduledTasks[0].start.getTime()).toEqual(Time.now());
        });
      });
    }); 

    describe("AND a 1-hour Todo", () => {
      describe("When schedule is called, it..", () => {
        let scheduledTasks: TaskEvent[];
        beforeEach(() => {
          scheduledTasks = schedule(oneHourWindow, oneHourTask) as TaskEvent[];          
        });

        it("Schedules the Todo for tomorrow", () => {
          expect(scheduledTasks[0].start).toEqual(Time.tomorrow());
        });
      });
    });

    describe("AND 2 1-hour Tasks", () => {
      describe("When schedule is called, it..", () => {
        let scheduledTasks: TaskEvent[];
        beforeEach(() => {
          console.log("When schedule is called, beforeEach");
          scheduledTasks = schedule(
            oneHourWindow,
            { ...oneHourTask },
            { ...oneHourTask }
          ) as TaskEvent[];
        });

        it("Schedules the higher priority Todo for tomorrow", () => {
          expect(scheduledTasks[0].start).toEqual(Time.tomorrow());
        }); 

        it("Schedules the lower priority Todo for the day after tomorrow", () => {
          expect(scheduledTasks[1].start).toEqual(Time.dayAfterTomorrow());
        }); 
      });
    });
  });
});
