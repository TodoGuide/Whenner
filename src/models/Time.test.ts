import { addHour, Period, periodsOverlap, latestOf } from "./Time";

describe("The addHour function", () => {
  it("Adds an hour to the specified date", () => {
    const start = new Date(2019, 6, 20, 4, 3, 2, 1);
    const expected = new Date(2019, 6, 20, 5, 3, 2, 1);
    const actual = addHour(start);
    expect(actual).toEqual(expected);
  });
});

describe("The periodsOverlap function", () => {
  const period8amTo9am: Period = {
    start: new Date(2019, 6, 23, 8, 0, 0, 0),
    end: new Date(2019, 6, 23, 9, 0, 0, 0)
  };

  const period830amTo930am: Period = {
    start: new Date(2019, 6, 23, 8, 30, 0, 0),
    end: new Date(2019, 6, 23, 9, 30, 0, 0)
  };

  const period930amTo1030am: Period = {
    start: new Date(2019, 6, 23, 9, 30, 0, 0),
    end: new Date(2019, 6, 23, 10, 30, 0, 0)
  };

  it("Returns true when given periods overlap", () => {
    expect(periodsOverlap(period8amTo9am, period830amTo930am)).toBeTruthy();
  });

  it("Returns false when given periods overlap", () => {
    expect(periodsOverlap(period8amTo9am, period930amTo1030am)).toBeFalsy();
    expect(periodsOverlap(period830amTo930am, period930amTo1030am)).toBeFalsy();
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
