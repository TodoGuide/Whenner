import { ITask } from "../models/Task";

export const oneHourTask: ITask = {
  id: 100,
  title: "One hour task",
  description: "This is a one hour task",
  priority: 1,
  estimate: 60,
  start: new Date(2019, 5, 15, 9, 46, 45, 44)
};


export const twoHourTask: ITask = {
  id: 101,
  title: "Two hour task",
  description: "This is a two hour task",
  priority: 2,
  estimate: 120,
  start: new Date(2019, 5, 15, 10, 46, 45, 44)
};

export const threeHourTask: ITask = {
  id: 103,
  title: "Three hour task",
  description: "This is a three hour task",
  priority: 3,
  estimate: 180,
  start: new Date(2019, 5, 15, 12, 46, 45, 44)
};