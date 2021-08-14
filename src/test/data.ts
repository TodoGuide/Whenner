// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright (C) 2019  James Tharpe

import moment from "moment";
import { Appointment } from "../models/Appointment";
import { Task } from "../models/Task";
import Time from "../models/time";

export const oneHourTask: Task = {
  id: 100,
  title: "One hour task",
  description: "This is a one hour task",
  priority: 1,
  estimate: 60,
};

export const twoHourTask: Task = {
  id: 101,
  title: "Two hour task",
  description: "This is a two hour task",
  priority: 2,
  estimate: 120,
};

export const threeHourTask: Task = {
  id: 103,
  title: "Three hour task",
  description: "This is a three hour task",
  priority: 3,
  estimate: 180,
};

export const supertask: Task = {
  id: 200,
  description: "This task has no supertask because it IS the supertask",
  priority: 1,
  estimate: 60,
  title: "Supertask",
};

export const subtaskA: Task = {
  id: 201,
  description: "Subtask A belongs to Supertask",
  priority: 2,
  estimate: 120,
  title: "Subtask A",
  supertaskId: supertask.id,
};
export const subtaskB: Task = {
  id: 203,
  description: "Subtask B belongs to Supertask",
  priority: 3,
  estimate: 180,
  title: "Subtask B",
  supertaskId: supertask.id,
  predecessorIds: [subtaskA.id],
};
export const subSubTask: Task = {
  id: 204,
  title: "Sub-subtask",
  description: "Sub-subtask belongs to Subtask B which belongs to Supertask",
  priority: 1,
  estimate: 60,
  supertaskId: subtaskB.id,
};

export const subSubSubtask: Task = {
  id: 205,
  title: "Sub-sub-subtask task",
  description:
    "Sub-sub-subtask belongs to sub-subtask which belongs to subtask B which belongs to Supertask",
  priority: 1,
  estimate: 60,
  supertaskId: subSubTask.id,
};

export const pastAppointment: Appointment = {
  description: "Appointment in the past",
  end: Time.yesterday(),
  id: 300,
  start: moment(Time.yesterday()).subtract(1, "hour").toDate(),
  title: "Appointment in the past",
};

export const allTestDataEvents = [
  oneHourTask,
  twoHourTask,
  threeHourTask,
  supertask,
  subtaskA,
  subtaskB,
  subSubTask,
  subSubSubtask,
  pastAppointment,
];
