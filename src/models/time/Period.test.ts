// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright (C) 2019  James Tharpe

import { Period, periodsOverlap } from "./Period";

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
