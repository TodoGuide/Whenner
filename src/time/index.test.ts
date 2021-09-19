// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright (C) 2019  James Tharpe

import { addHour, latestOf } from ".";

describe("The addHour function", () => {
  it("Adds an hour to the specified date", () => {
    expect(addHour(new Date(2019, 6, 20, 4, 3, 2, 1))).toEqual(
      new Date(2019, 6, 20, 5, 3, 2, 1)
    );
  });
});

describe("The latestOf function", () => {
  it("Returns the latest date of those given", () => {
    expect(
      latestOf(
        new Date(2019, 6, 26, 20, 50, 49, 47),
        new Date(2019, 6, 26, 20, 50, 49, 48),
        new Date(2019, 6, 26, 20, 50, 48, 48),
        new Date(2019, 6, 26, 20, 49, 49, 48)
      )
    ).toEqual(new Date(2019, 6, 26, 20, 50, 49, 48));
  });
});
