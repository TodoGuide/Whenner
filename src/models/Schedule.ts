import { defaultAppointments, AppointmentEvent } from "./AppointmentEvent";
import { Appointment } from "./Appointment";
import { defaultTasks, TaskEvent, taskPrioritizer } from "./TaskEvent";
import { Task } from "./Task";
import {
  Chronotype,
  defaultChronotype,
  startOf,
  endOf,
  lengthInMinutes
} from "./Chronotype";
import { Time } from "./time";
import { periodsOverlap } from "./time/Period";
import { Estimated } from "./time/Estimated";
import { End } from "./time/End";
import { orderByStart } from "./time/Start";
import { latestOf } from "./time/utils";
import { prioritize } from "./Priority";

export interface ISchedule {
  readonly appointments: Appointment[];
  readonly chronotype: Chronotype;
  readonly tasks: Task[];
}

// function scheduleBuilder(schedule: ISchedule) {

//   const appointments = inStartOrder(...schedule.appointments);
//   const tasks = inPriorityOrder(...schedule.tasks);

//   return function (): Array<Appointment | Task> {

//   }
// }

export class Schedule implements ISchedule {
  readonly appointments: AppointmentEvent[];
  readonly chronotype: Chronotype;
  readonly tasks: TaskEvent[];
  readonly todos: Array<Appointment | Task>;

  constructor({ chronotype, appointments, tasks }: ISchedule) {
    this.chronotype = chronotype;

    this.appointments = orderByStart(
      ...appointments.map(appointment => new AppointmentEvent(appointment))
    );

    this.tasks = Schedule.mutations.stackTasks(
      Time.current(),
      this.chronotype,
      ...tasks.map(task => new TaskEvent(task))
    );

    this.todos = Schedule.mutations.scheduleTasks(
      this.chronotype,
      this.appointments,
      this.tasks
    );
  }

  //
  // Utilities
  //

  /**
   * Determines if the End can be completed as-scheduled based on the provided Chronotype
   */
  static canBeCompletedSameDay({ end }: End, chronotype: Chronotype) {
    return end <= endOf(end, chronotype);
  }

  /**
   * Determines if the todo can be within the a single Chronotype period
   */
  static canBeCompletedWithinOneDay(
    { estimate }: Estimated,
    chronotype: Chronotype
  ) {
    return estimate <= lengthInMinutes(chronotype);
  }

  //
  // Mutations
  //

  static readonly mutations = {
    stackTasks: function(
      start: Date,
      chronotype: Chronotype,
      ...tasks: TaskEvent[]
    ) {
      let lastIncomplete: TaskEvent | undefined = undefined;
      for (let i = 0; i < tasks.length; i++) {
        const previous = tasks[i - 1];
        const current = tasks[i];

        lastIncomplete =
          previous && previous.completed ? lastIncomplete : previous;

        if (current.completed) {
          // Only stack incomplete Tasks
          continue;
        }

        start = latestOf(
          start,
          startOf(start, chronotype),
          (lastIncomplete || { end: start }).end
        );

        current.priority = start.getTime();

        if (
          !Schedule.canBeCompletedSameDay(current, chronotype) &&
          Schedule.canBeCompletedWithinOneDay(current, chronotype)
        ) {
          // Task cannot be completed today, so move it to tomorrow
          start = startOf(Time.dayAfter(start), chronotype);
          current.priority = start.getTime();
        }
      }

      return prioritize(taskPrioritizer, ...tasks);
    },

    scheduleTasks: function(
      chronotype: Chronotype,
      appointments: AppointmentEvent[],
      tasks: TaskEvent[]
    ) {
      const result = prioritize(
        (item: AppointmentEvent | TaskEvent) => item.start.getTime(),
        ...[...appointments, ...tasks]
      );

      let lastAppointmentIndex = 0;
      const isAppointment = (todo: any) => {
        const index = appointments.indexOf(todo, lastAppointmentIndex);
        if (index >= 0) {
          lastAppointmentIndex = index;
          return true;
        }
        return false;
      };

      for (let i = 0; i < result.length; i++) {
        const current = result[i];
        const next = result[i + 1];

        if (current.completed || isAppointment(current)) {
          // Don't change completed items or appointments
          continue;
        }

        // `current` is an incomplete Task

        if (next && periodsOverlap(current, next)) {
          const nextStartDate = isAppointment(next) ? next.end : current.start;
          const currentTaskIndex = tasks.indexOf(current as any);
          const remainingTasks = tasks.slice(currentTaskIndex);
          Schedule.mutations.stackTasks(
            nextStartDate,
            chronotype,
            ...remainingTasks
          );
        }
      }

      return result;
    }
  };
}

export const defaultSchedule: ISchedule = {
  chronotype: defaultChronotype,
  appointments: defaultAppointments,
  tasks: defaultTasks
};
