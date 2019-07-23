import { Time } from "../models/Time";
import { Task } from "../models/Task";

export const customMatchers = {
  // toBeWithinTheLast300ms: function(util?: any, customEqualityTesters?: any) {
  //   return {
  //     compare: function(actual: number) {
  //       const now = Time.now();
  //       const nowMinus300ms = now - 300;
  //       const pass = actual <= now && actual >= nowMinus300ms;
  //       return {
  //         pass,
  //         message: () =>
  //           `*** FAIL: *** Expected ${actual} (${new Date(actual)}) ${
  //             pass ? "not" : ""
  //           } to be within  ${now} (${new Date(
  //             now
  //           )}) and ${nowMinus300ms} (${new Date(nowMinus300ms)})"`
  //       };
  //     }
  //   };
  // },

  toBeScheduledCopyOf: function(util: any, customEqualityTesters: any) {
    return {
      compare: function(actual: Task, expected: Task) {
        // Normalize
        actual = new Task(actual);
        expected = new Task(expected);

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
