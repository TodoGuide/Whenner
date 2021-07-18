import { defaultAppointments } from "./AppointmentEvent";
import { defaultTasks } from "./TaskEvent";
import { incomplete, Todo } from "./Todo";

describe("The Todo Module", () => {
  describe("Given a populated Todo List with one incomplete item", () => {
    let todos: Todo[];
    beforeEach(() => {
      todos = [...defaultTasks, ...defaultAppointments];
    });

    it("When the todo list is passed to incomplete, it returns the incomplete items", () => {
      expect(incomplete(todos)).toEqual(defaultTasks.slice(1));
    });
  });
});
