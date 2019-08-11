// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright (C) 2019  James Tharpe

import { Time } from "../models/time";
import { TaskEvent } from "../models/TaskEvent";

export const customMatchers = {
  toBeScheduledCopyOf: function(util: any, customEqualityTesters: any) {
    return {
      compare: function(actual: TaskEvent, expected: TaskEvent) {
        // Normalize
        actual = new TaskEvent(actual);
        expected = new TaskEvent(expected);

        const actualStart = new Date(actual.start).getTime();
        const pass = actualStart >= Time.now();

        expect({ ...actual, start: expected.start, id: expected.id }).toEqual(
          expected
        );

        return {
          pass,
          message: () =>
            `Expected start ${actual.start} ${
              pass ? "not" : ""
            } to be greater than or equal to current date and time ${Time.current()})`
        };
      }
    };
  }
};
