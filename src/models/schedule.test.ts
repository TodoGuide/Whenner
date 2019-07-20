import { ITask } from "./Task";
import { customMatchers } from "../test/matchers";
import { Time, addHour } from "./time";
import { Appointment } from "./Appointment";

// describe('A Schedule', () => {
  
// });

describe('The toAppointment method', () => {
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
    }

    const expectedAppointment = new Appointment({
      id: 1,
      title: "title",
      description: "description",
      start: Time.current(),
      end: addHour(Time.current())
    });
    const actualAppointment = toAppointment(task);
    expect(actualAppointment).toEqual(expectedAppointment);
  });
});