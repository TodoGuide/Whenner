import moment from "moment";
import Appointment from "../models/appointment";
import Chronotype from "../models/chronotype";
import Task from "../models/task";

export const defaultTasks: Task[] = [
  // {
  //   id: 1,
  //   title: "Use Whenner",
  //   description: "This is done already!",
  //   estimate: 5,
  //   completed: Time.current(),
  //   priority: Time.now(),
  // },
  // {
  //   id: 2,
  //   title: "Get started with Whenner",
  //   description: "Click stuff, learn how the app works",
  //   estimate: 5,
  //   priority: Time.now() + 1,
  // },
];

export const defaultAppointments: Appointment[] = [
  // {
  //   id: Time.now(),
  //   title: "Call someone you love",
  //   description: "Let them know how much you appreciate them",
  //   start: addHour(Time.current()),
  //   end: addHour(addHour(Time.current())),
  // },
];

export const defaultEvents = [...defaultTasks, ...defaultAppointments];

export const defaultChronotype: Chronotype = {
  start: moment.duration("7:15"), // 7:15am
  end: moment.duration("19:00"), // 7:00pm
};
