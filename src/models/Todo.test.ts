import { Todo, ITodo } from "./Todo";
import { customMatchers } from "../test/matchers";
import { Time } from "./time";

describe("The Todo Class", () => {
  beforeEach(() => {
    jasmine.addMatchers(customMatchers);
    Time.set(new Date(2019, 6, 5, 12, 0, 0, 0)); // 2019-07-05 at Noon
  });

  describe("Given a valid ITodo instance", () => {
    const validITodoInstance: ITodo = {
      id: 1,
      title: "ITodo Instance",
      description: "This is a valid instance of the ITodo interface",
      estimate: 5,
      start: new Date(2019, 6, 2, 15, 9, 8, 7),
      done: false
    };

    describe("When the instance is passed to the Todo constructor, it...", () => {
      const todoFromValidITodo = new Todo(validITodoInstance);

      it("Sets the End date based on the Start and Estimate", () => {
        expect(todoFromValidITodo.end).toEqual(
          new Date(2019, 6, 2, 15, 14, 8, 7)
        );
      });
    });
  });

  describe("Given no ITodo instance", () => {
    describe("When nothing is passed to the Todo constructor, it...", () => {
      let todoFromFalsyITodo: Todo;
      beforeEach(() => {
        todoFromFalsyITodo = new Todo();
      });

      it("Defaults to an ID of the current date and time", () => {
        expect(todoFromFalsyITodo.id).toEqual(Time.now());
      });

      it("Defaults to an empty Title", () => {
        expect(todoFromFalsyITodo.title).toBe("");
      });

      it("Defaults to an empty Description", () => {
        expect(todoFromFalsyITodo.description).toBe("");
      });

      it("Defaults to a 60 minute Estimate", () => {
        expect(todoFromFalsyITodo.estimate).toBe(60);
      });

      it("Defaults to a Start of the current datetime", () => {
        expect(todoFromFalsyITodo.start.getTime()).toEqual(Time.now());
      });

      it("Defaults to NOT Done", () => {
        expect(todoFromFalsyITodo.done).toBe(false);
      });
    });
  });
});
