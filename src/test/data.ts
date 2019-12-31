// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright (C) 2019  James Tharpe

import { Task } from "../models/Task";

export const oneHourTask: Task = {
  id: 100,
  title: "One hour task",
  description: "This is a one hour task",
  priority: 1,
  estimate: 60
};

export const twoHourTask: Task = {
  id: 101,
  title: "Two hour task",
  description: "This is a two hour task",
  priority: 2,
  estimate: 120
};

export const threeHourTask: Task = {
  id: 103,
  title: "Three hour task",
  description: "This is a three hour task",
  priority: 3,
  estimate: 180
};

export const parentTask: Task = {
  id: 200,
  description: "This task has no parents because it IS the parent",
  priority: 1,
  estimate: 60,
  title: "Parent Task"
};

export const childTaskA: Task = {
  id: 201,
  description: "Child A belongs to Parent Task",
  priority: 2,
  estimate: 120,
  title: "Child A Task",
  parentId: parentTask.id
};
export const childTaskB: Task = {
  id: 203,
  description: "Child B belongs to Parent Task",
  priority: 3,
  estimate: 180,
  title: "Child B Task",
  parentId: parentTask.id
};
export const grandChildTask: Task = {
  id: 204,
  title: "Grand child task",
  description:
    "Grandchild task belongs to Child B which belongs to Parent Task",
  priority: 1,
  estimate: 60,
  parentId: childTaskB.id
};

export const greatGrandChildTask: Task = {
  id: 205,
  title: "Great Grand child task",
  description:
    "Great Grandchild Task belongs to Grandchild Task which belongs to Child B which belongs to Parent Task",
  priority: 1,
  estimate: 60,
  parentId: grandChildTask.id
};

export const allTestDataTasks = [
  oneHourTask,
  twoHourTask,
  threeHourTask,
  parentTask,
  childTaskA,
  childTaskB,
  grandChildTask,
  greatGrandChildTask
];
