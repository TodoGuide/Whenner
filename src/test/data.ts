import { ITask } from "../models/Task";

export const oneHourTask: ITask = {
  id: 100,
  title: "One hour todo",
  description: "This is a one hour Todo",
  priority: 1,
  estimate: 60,
  start: new Date(2019, 5, 15, 9, 46, 45, 44)
};


export const twoHourTask: ITask = {
  id: 101,
  title: "Two hour todo",
  description: "This is two hour Todo",
  priority: 2,
  estimate: 120,
  start: new Date(2019, 5, 15, 10, 46, 45, 44)
};