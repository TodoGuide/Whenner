// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright (C) 2019  James Tharpe

export const fakeAsyncWrapper = <T, TArgs extends Array<T>, TResult>(
  inner: (...args: TArgs) => TResult,
  waitMs: number = 0
) => {
  return (...args: TArgs): Promise<TResult> => {
    return new Promise(resolve => {
      // Simulate slow write
      setTimeout(function() {
        resolve(inner(...args));
      }, waitMs);
    });
  };
};
