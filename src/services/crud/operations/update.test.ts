import Identifiable from "../../Id";
import { Upserter, upserter } from "./update";

describe("The update module", () => {
  describe("upserter function", () => {
    let insert: jest.Mock<Promise<Identifiable>>;

    beforeEach(async () => {
      insert = jest.fn(async (record: Identifiable) => record);
    });

    describe("Given the update function passed to upserter() returns undefined", () => {
      let update: jest.Mock<Promise<Identifiable | undefined>>;
      let upsert: Upserter<Identifiable>;

      beforeEach(() => {
        update = jest.fn(async (_: Identifiable) => undefined);
        upsert = upserter(update, insert);
      });

      describe("When the returned upsert function is called, it", () => {
        let upserted: Identifiable;
        beforeEach(async () => {
          upserted = await upsert({ id: 123 });
        });

        it("Tries to update the object using the given update function", () => {
          expect(update.mock.calls.length).toBe(1);
        });

        it("Inserts the object using the given insert function", () => {
          expect(insert.mock.calls.length).toBe(1);
        });

        it("Returns the result of the given insert function", () => {
          expect(upserted).toEqual({ id: 123 });
        });
      });
    });

    describe("Given the update function passed to upserter() returns the updated record", () => {
      let update: jest.Mock<Promise<Identifiable | undefined>>;
      let upsert: Upserter<Identifiable>;

      beforeEach(() => {
        update = jest.fn(async (record: Identifiable) => record);
        upsert = upserter(update, insert);
      });

      describe("When the returned upsert function is called, it", () => {
        let upserted: Identifiable;
        beforeEach(async () => {
          upserted = await upsert({ id: 123 });
        });

        it("Updates the object using the provided update function", () => {
          expect(update.mock.calls.length).toBe(1);
        });

        it("Does not try to insert the object", () => {
          expect(insert.mock.calls.length).toBe(0);
        });

        it("Returns the result of the  update function", () => {
          expect(upserted).toEqual({ id: 123 });
        });
      });
    });
  });
});
