import { TodosService, defaultTodos } from "./TodosService";
import { ITodo } from "../models/Todo";
import { oneHourTodo } from "../test/data";
import { customMatchers } from "../test/matchers";

describe("The Todos Service", () => {
  let todosService: TodosService;

  beforeEach(() => {
    todosService = new TodosService();
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
        expect(allResult).toEqual(defaultTodos);
      });
    });

    describe("When upsert is called with a new Todo, it...", () => {
      let upsertResult: ITodo;

      beforeEach(async function() {
        upsertResult = await todosService.upsert(oneHourTodo);
        console.log("upsertResult", upsertResult);
      });

      it('Inserts the provided Todo', async function() {
        const found = await todosService.byId(oneHourTodo.id);
        console.log("found", found);
        expect(found).toBeScheduledCopyOf(oneHourTodo);
      });
    });
  });
});
