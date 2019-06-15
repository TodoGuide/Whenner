import { Todo, ITodo } from "./Todo";

describe("The Todo Class", () => {
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

      it("Takes the properties of the ITodo instance", () => {
        expect(todoFromValidITodo).toEqual(validITodoInstance);
        expect(todoFromValidITodo).not.toBe(validITodoInstance);
      });

      it("Sets the End date based on the Start and Estimate", () => {
        expect(todoFromValidITodo.end).toEqual(
          new Date(2019, 6, 2, 15, 14, 8, 7)
        );
      });
    });
  });

  describe("Given a falsey ITodo instance", () => {
    const falseyITodoInstance: ITodo | null = null;

    describe("When the instance is passed to the Todo constructor, it...", () => {
      const todoFromFalseyITodo = new Todo(falseyITodoInstance);

      it("Defaults to an ID of the current datetime", () => {
        expect(todoFromFalseyITodo.id).toBeLessThanOrEqual(Date.now());
        expect(todoFromFalseyITodo.id).toBeGreaterThanOrEqual(Date.now() - 100);
      });

      it("Defaults to an empty Title", () => {
        expect(todoFromFalseyITodo.title).toBe("");
      });

      it("Defaults to an empty Description", () => {
        expect(todoFromFalseyITodo.description).toBe("");
      });

      it("Defaults to a 60 minute Estimate", () => {
        expect(todoFromFalseyITodo.estimate).toBe(60);
      });

      it("Defaults to a Start of the current datetime", () => {
        expect(todoFromFalseyITodo.start.getTime()).toBeLessThanOrEqual(
          Date.now()
        );
        expect(todoFromFalseyITodo.start.getTime()).toBeGreaterThanOrEqual(
          Date.now() - 100
        );
      });

      it("Defaults to NOT Done", () => {
        expect(todoFromFalseyITodo.done).toBe(false);
      });
    });
  });
});
