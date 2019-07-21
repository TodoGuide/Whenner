import { ITask, Task } from "./Task";
import { customMatchers } from "../test/matchers";
import { Time, addHour } from "./time";
import { Appointment, IAppointment } from "./Appointment";
import { toAppointment, Schedule, toTask } from "./Schedule";

describe("A Schedule", () => {
  describe("Given a task that can't completed before an appointment", () => {
    let schedule: Schedule;
    const task: ITask = {
      id: 1,
      title: "Task",
      description: "Description",
      estimate: 20,
      priority: Time.now() - 1
    };
    const appointment: IAppointment = {
      id: 2,
      title: "Appointment",
      description: "Description",
      start: Time.current(),
      end: addHour(Time.current())
    };

    beforeEach(() => {
      schedule = new Schedule({ appointments: [appointment], tasks: [task] });
    });
  });
});

describe("The toAppointment method", () => {
  beforeEach(() => {
    jasmine.addMatchers(customMatchers);
    Time.set(new Date(2019, 6, 20, 13, 1, 0, 0)); // 2019-07-20 at 1:01PM
  });

  it("Converts a Task to an appointment", () => {
    const task: ITask = {
      id: 1,
      title: "title",
      description: "description",
      estimate: 60,
      priority: Time.now()
    };

    const expectedAppointment = new Appointment({
      id: 1,
      title: "title",
      description: "description",
      start: Time.current(),
      end: addHour(Time.current())
    });
    const actualAppointment = toAppointment(task);
    expect(actualAppointment).toEqual({
      ...expectedAppointment,
      estimate: 60,
      priority: Time.now()
    });
  });
});

describe("The toTask method", () => {
  beforeEach(() => {
    jasmine.addMatchers(customMatchers);
    Time.set(new Date(2019, 6, 20, 13, 1, 0, 0)); // 2019-07-20 at 1:01PM
  });

  it("Converts an Appointment to a task", () => {
    const appointment: IAppointment = {
      id: 1,
      title: "title",
      description: "description",
      start: Time.current(),
      end: addHour(Time.current())
    };

    const expectedTask = new Task({
      id: 1,
      title: "title",
      description: "description",
      priority: Time.now(),
      estimate: 60
    });
    const actualTask = toTask(appointment);
    expect(actualTask).toEqual(expectedTask);
  });
});
