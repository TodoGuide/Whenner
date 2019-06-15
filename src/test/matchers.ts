import { ITodo } from "../models/Todo";

export const customMatchers = {
  toBeWithinTheLast100ms: function(util?: any, customEqualityTesters?: any) {
    return {
      compare: function(actual: number) {
        const now = Date.now();
        const nowMinus100ms = now - 100;
        const pass = actual <= now && actual >= nowMinus100ms;
        return {
          pass,
          message: () =>
            `*** FAIL: *** Expected ${actual} (${new Date(actual)}) ${
              pass ? "not" : ""
            } to be within  ${now} (${new Date(
              now
            )}) and ${nowMinus100ms} (${new Date(nowMinus100ms)})"`
        };
      }
    };
  },

  toBeScheduledCopyOf: function(util: any, customEqualityTesters: any) {
    return {
      compare: function(actual: ITodo, expected: ITodo) {
        const now = Date.now() - 100; // Allow time to have passed during test run
        const actualStart = actual.start.getTime(); 
        actual = Object.assign({}, actual);
        expected = Object.assign({}, expected);

        const pass = actualStart >= now;

        // Set equal for comparison
        actual.start = expected.start;
        expect(actual).toEqual(expected);

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
