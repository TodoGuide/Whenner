// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright (C) 2019  James Tharpe

import { defaultEvents, EventsService } from "./EventsService";
import { Todo } from "../models/Todo";
import { oneHourTask } from "../test/data";
import { defaultChronotype } from "../models/Chronotype";
import Time from "../models/time";
import { Task } from "../models/Task";
import { Crud } from "./crud";
import { Event } from "../models/Event";

describe("The Events Service", () => {
  let eventsService: Crud<Event>;

  beforeEach(() => {
    eventsService = EventsService.create(defaultChronotype);
    Time.set(new Date(2019, 6, 5, 12, 0, 0, 0)); // 2019-07-05 at Noon
  });

  describe("Given nothing in local storage", () => {
    beforeEach(() => {
      localStorage.clear();
    });

    describe("When read() is called, it...", () => {
      let allResult: Todo[];
      beforeEach(async function () {
        allResult = await eventsService.read();
      });

      it("Returns the default tasks", () => {
        allResult.forEach((item, index) => {
          expect(item.description).toEqual(defaultEvents[index].description);
          expect(item.title).toEqual(defaultEvents[index].title);
          expect(item.id).toEqual(defaultEvents[index].id);
        });
      });
    });

    describe("When upsert is called with a new Task, it...", () => {
      let upsertResult: Todo;

      beforeEach(async function () {
        upsertResult = await eventsService.upsert(oneHourTask);
        console.log("upsertResult", upsertResult);
        expect(upsertResult).toBeDefined();
      });

      it("Inserts the provided Task", async function () {
        const found = (await eventsService.find(upsertResult.id)) as Task;
        expect(found?.description).toEqual(oneHourTask.description);
        expect(found?.estimate).toEqual(oneHourTask.estimate);
        expect(found?.title).toEqual(oneHourTask.title);
      });
    });
  });
});
