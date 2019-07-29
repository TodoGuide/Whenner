import { AppointmentEvent } from "./Appointment";
import { customMatchers } from "./../test/matchers";
import { Schedule } from "./Schedule";
import { oneHourTask, twoHourTask, threeHourTask } from "./../test/data";
import { defaultChronotype } from "./Chronotype";
import { TaskEvent } from "./Task";
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
    let incompleteTask1: TaskEvent, incompleteTask2: TaskEvent, completedTask: TaskEvent;
    beforeEach(() => {
      incompleteTask1 = new TaskEvent({ ...oneHourTask });
      incompleteTask2 = new TaskEvent({
        ...twoHourTask,
        start: add30Minutes(oneHourTask.start)
      });
      completedTask = new TaskEvent({
        ...threeHourTask,
        start: add30Minutes(oneHourTask.start)
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

      it("Sets the lower priority task start to immedietly follow the higher priority task end", () => {
        expect(incompleteTask2.start).toEqual(incompleteTask1.end);
      });

      it("Does NOT modify the completed task", () => {
        expect(completedTask.start).toEqual(add30Minutes(oneHourTask.start));
      });
    });

    describe("AND an appointment that overlaps the incomplete tasks", () => {
      let overlappingAppointment: AppointmentEvent;
      beforeEach(() => {
        overlappingAppointment = new AppointmentEvent({
          ...incompleteTask1,
          start: add30Minutes(incompleteTask1.start),
          priority: add30Minutes(incompleteTask1.start).getTime(),
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

        it("Deprioritizes first task to start immedietly after the appointment", () => {
          expect(incompleteTask1.start).toEqual(overlappingAppointment.end);
        });

        it("Deprioritizes second task to start immedietly after the first task", () => {
          expect(incompleteTask2.start).toEqual(incompleteTask1.end);
        });

        it("Does NOT modify the completed task", () => {
          expect(completedTask.start).toEqual(add30Minutes(oneHourTask.start));
        });
      });
    });
  });
});
