// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright (C) 2019  James Tharpe

import { AppointmentEvent } from "./AppointmentEvent";
import { customMatchers } from "./../test/matchers";
import { Schedule } from "./Schedule";
import { oneHourTask, twoHourTask, threeHourTask } from "../test/data";
import { defaultChronotype } from "./Chronotype";
import { TaskEvent } from "./TaskEvent";
import { Time } from "./time";
import { add30Minutes } from "./time/utils";
// describe("A Schedule", () => {

// });

describe("Schedule Mutations", () => {
  beforeEach(() => {
    jasmine.addMatchers(customMatchers);
    Time.set(new Date(2019, 6, 5, 12, 0, 0, 0)); // 2019-07-05 at Noon
  });

  describe("Given two overlapping incomplete tasks and one completed task", () => {
    let incompleteTask1: TaskEvent,
      incompleteTask2: TaskEvent,
      completedTask: TaskEvent;

    beforeEach(() => {
      incompleteTask1 = new TaskEvent({ ...oneHourTask, priority: Time.now() });
      incompleteTask2 = new TaskEvent({
        ...twoHourTask,
        priority: add30Minutes(Time.current()).getTime()
      });
      completedTask = new TaskEvent({
        ...threeHourTask
      });
      completedTask.completed = TaskEvent.calculateEnd(completedTask);
    });

    describe("When stackTasks is called, it...", () => {
      // let stackedTasks: ITask[];
      beforeEach(() => {
        Schedule.mutations.stackTasks(
          Time.current(),
          defaultChronotype,
          incompleteTask1,
          incompleteTask2
        );
      });

      it("Prioritizes the higher priority item for the given date", () => {
        expect(incompleteTask1.priority).toEqual(Time.now());
      });

      it("Sets the lower priority task start to immediately follow the higher priority task end", () => {
        expect(incompleteTask2.start).toEqual(incompleteTask1.end);
      });

      it("Does NOT modify the completed task", () => {
        expect(completedTask.priority).toEqual(threeHourTask.priority);
      });
    });

    describe("AND an appointment that overlaps the incomplete tasks", () => {
      let overlappingAppointment: AppointmentEvent;
      beforeEach(() => {
        overlappingAppointment = new AppointmentEvent({
          ...incompleteTask1,
          start: add30Minutes(incompleteTask1.start),
          end: add30Minutes(incompleteTask1.end)
        });
      });

      describe("When scheduleTasks is called, it...", () => {
        beforeEach(() => {
          Schedule.mutations.scheduleTasks(
            defaultChronotype,
            [overlappingAppointment],
            [incompleteTask1, incompleteTask2, completedTask]
          );
        });

        it("Deprioritizes first task to start immediately after the appointment", () => {
          expect(incompleteTask1.start).toEqual(overlappingAppointment.end);
        });

        it("Deprioritizes second task to start immediately after the first task", () => {
          expect(incompleteTask2.start).toEqual(incompleteTask1.end);
        });

        it("Does NOT modify the completed task", () => {
          expect(completedTask.priority).toEqual(threeHourTask.priority);
        });
      });
    });
  });
});
