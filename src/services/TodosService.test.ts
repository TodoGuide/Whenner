import { TodosService, defaultTodos } from "./TodosService";
import { ITodo } from "../models/Todo";
import { oneHourTodo } from "../test/data";
import { customMatchers } from "../test/matchers";
import { defaultChronotype } from "../models/Chronotype";
import { Time } from "../models/time";

describe("The Todos Service", () => {
  let todosService: TodosService;

  beforeEach(() => {
    todosService = new TodosService(defaultChronotype);
    jasmine.addMatchers(customMatchers);
    Time.current = () => new Date(2019, 6, 5, 12, 0, 0, 0); // 2019-07-05 at Noon
    Time.now = () => Time.current().getTime();
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
