import { TasksService, defaultTasks } from "./TasksService";
import { Todo } from "../models/Todo";
import { oneHourTask } from "../test/data";
import { customMatchers } from "../test/matchers";
import { defaultChronotype } from "../models/Chronotype";
import { Time } from "../models/time";

describe("The Tasks Service", () => {
  let tasksService: TasksService;

  beforeEach(() => {
    tasksService = new TasksService(defaultChronotype);
    jasmine.addMatchers(customMatchers);
    Time.set(new Date(2019, 6, 5, 12, 0, 0, 0)); // 2019-07-05 at Noon
  });

  describe("Given nothing in local storage", () => {
    beforeEach(() => {
      localStorage.clear();
    });

    describe("When all() is called, it...", () => {
      let allResult: Todo[];
      beforeEach(async function() {
        allResult = await tasksService.all();
      });

      it("Returns the default tasks", () => {
        allResult.forEach((item, index) =>
          expect(item).toBeScheduledCopyOf(defaultTasks[index])
        );
      });
    });

    describe("When upsert is called with a new Todo, it...", () => {
      let upsertResult: Todo;

      beforeEach(async function() {
        upsertResult = await tasksService.upsert(oneHourTask);
        expect(upsertResult).toBeDefined();
      });

      it("Inserts the provided Todo", async function() {
        const found = await tasksService.byId(upsertResult.id);
        console.log("found", found);
        expect(found).toBeScheduledCopyOf(oneHourTask);
      });
    });
  });
});
