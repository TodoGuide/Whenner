import { Completable } from "./completable";
import { closed, isClosed } from "./closable";
import { isOpened } from "./statusable";

describe("The 'closable' module", () => {
  describe("Given a Completable with a completed date", () => {
    const completable: Completable = {
      completed: new Date(2021, 7, 13, 16, 47),
    };

    describe("When the completable is passed to the closed() function, it", () => {
      const closedResult = closed(completable);
      it("Returns the completed date of the Completable", () => {
        expect(closedResult).toEqual(completable.completed);
      });
    });

    describe("When the completable is passed to the isClosed() function, it", () => {
      const isClosedResult = isClosed(completable);
      it("Returns true", () => {
        expect(isClosedResult).toBe(true);
      });
    });

    describe("When the completable is passed to the isOpened() function, it", () => {
      const isOpenedResult = isOpened(completable);
      it("Returns false", () => {
        expect(isOpenedResult).toBe(false);
      });
    });
  });
});
