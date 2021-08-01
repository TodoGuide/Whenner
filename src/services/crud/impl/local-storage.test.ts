// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright (C) 2021  James Tharpe

import { Crud } from "..";
import { Time } from "../../../models/time";
import { localStorageCrud } from "./local-storage";

type TestEntity = { id: number; data: string };

describe("The local-storage CRUD module", () => {
  describe("Given an empty local-storage CRUD object", () => {
    let crud!: Crud<TestEntity>;
    const currentTime = Time.set(new Date(2021, 7, 31, 9, 35, 34, 33));

    beforeEach(() => {
      crud = localStorageCrud({ key: "unit-test" });
    });

    it("When find() is called, it returns undefined", async () => {
      expect(await crud.find(1)).toBeUndefined();
    });

    describe("When an object is inserted, it...", () => {
      let inserted: TestEntity;
      beforeEach(async () => {
        inserted = await crud.insert({ id: 1, data: "Item one" });
      });

      it("Is automatically assigns an ID based on the current time", () => {
        expect(inserted.id).toEqual(currentTime.getTime());
      });

      it("Cannot be inserted again", async () => {
        await expect(crud.insert({ ...inserted })).rejects.toThrow(
          `Cannot insert item with ID ${inserted.id} because it already exists`
        );
      });

      it("Can be found using find()", async () => {
        expect(await crud.find(inserted.id)).toEqual(inserted);
      });

      it("Can be updated using update()", async () => {
        expect(await crud.update({ ...inserted, data: "Updated!" })).toEqual({
          ...inserted,
          data: "Updated!",
        });
      });

      it("Can be updated using upsert()", async () => {
        expect(
          await crud.upsert({ ...inserted, data: "Updated with upsert!" })
        ).toEqual({
          ...inserted,
          data: "Updated with upsert!",
        });
      });
    });
  });
});
