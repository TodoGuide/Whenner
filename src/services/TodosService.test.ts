import { TodosService, defaultTodos } from "./TodosService";
import { ITodo } from "../models/Todo";
import { oneHourTodo } from "../test/data";
import { customMatchers } from "../test/matchers";
import { defaultChronotype } from "../models/Chronotype";

describe("The Todos Service", () => {
  let todosService: TodosService;

  beforeEach(() => {
    todosService = new TodosService(defaultChronotype);
    jasmine.addMatchers(customMatchers);
  });

  describe("Given nothing in local storage", () => {
    beforeEach(() => {
      localStorage.clear();
    });

    describe("When all() is called, it...", () => {
      let allResult: ITodo[];
      beforeEach(async function() {
        allResult = await todosService.all();
      });

      it("Returns the default todos", () => {
        allResult.forEach((item, index) =>
          expect(item).toBeScheduledCopyOf(defaultTodos[index])
        );
      });
    });

    describe("When upsert is called with a new Todo, it...", () => {
      let upsertResult: ITodo;

      beforeEach(async function() {
        upsertResult = await todosService.upsert(oneHourTodo);
        expect(upsertResult).toBeDefined();
      });

      it("Inserts the provided Todo", async function() {
        const found = await todosService.byId(upsertResult.id);
        console.log("found", found);
        expect(found).toBeScheduledCopyOf(oneHourTodo);
      });
    });
  });
});
