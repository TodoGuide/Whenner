import { readListFinder } from "./retrieve";

describe("The retrieve module", () => {
  describe("The readListFinder", () => {
    it("Returns a finder function composed from the reader argument", async () => {
      const finder = readListFinder(() =>
        Promise.resolve([{ id: 1 }, { id: 2 }, { id: 3 }])
      );
      await expect(finder(1)).resolves.toEqual({ id: 1 });
      await expect(finder(4, [{ id: 4 }])).resolves.toEqual({ id: 4 });
    });
  });
});
