import { ITodo } from "../models/Todo";

export const customMatchers = {
  toBeWithinTheLast200ms: function(util?: any, customEqualityTesters?: any) {
    return {
      compare: function(actual: number) {
        const now = Date.now();
        const nowMinus200ms = now - 200;
        const pass = actual <= now && actual >= nowMinus200ms;
        return {
          pass,
          message: () =>
            `*** FAIL: *** Expected ${actual} (${new Date(actual)}) ${
              pass ? "not" : ""
            } to be within  ${now} (${new Date(
              now
            )}) and ${nowMinus200ms} (${new Date(nowMinus200ms)})"`
        };
      }
    };
  },

  toBeScheduledCopyOf: function(util: any, customEqualityTesters: any) {
    return {
      compare: function(actual: ITodo, expected: ITodo) {
        const now = Date.now() - 200; // Allow time to have passed during test run
        const actualStart = actual.start.getTime();
        const pass = actualStart >= now;

        expect({ ...actual, start: expected.start }).toEqual(expected);

        return {
          pass,
          message: () =>
            `Expected start ${actual.start} ${
              pass ? "not" : ""
            } to be greater than or equal to current datetime ${new Date(now)})`
        };
      }
    };
  }
};
