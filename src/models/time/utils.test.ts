import { addHour, latestOf } from "./utils";

describe("The addHour function", () => {
  it("Adds an hour to the specified date", () => {
    expect(addHour(new Date(2019, 6, 20, 4, 3, 2, 1))).toEqual(
      new Date(2019, 6, 20, 5, 3, 2, 1)
    );
  });
});

describe("The latestOf function", () => {
    it("Returns the latest date of those given", () => {
      expect(latestOf(
        new Date(2019, 6, 26, 20, 50, 49, 47),
        new Date(2019, 6, 26, 20, 50, 49, 48),
        new Date(2019, 6, 26, 20, 50, 48, 48),
        new Date(2019, 6, 26, 20, 49, 49, 48)
      )).toEqual(new Date(2019, 6, 26, 20, 50, 49, 48))
    });
  });
  
