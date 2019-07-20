import { addHour } from "./time";


describe('The addHour function', () => {
  it('Adds an hour to the specified date', () => {
    const start = new Date(2019, 6, 20, 4, 3, 2, 1);
    const expected = new Date(2019, 6, 20, 5, 3, 2, 1);
    const actual = addHour(start);
    expect(actual).toEqual(expected);
  });
});