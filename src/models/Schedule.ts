import { IAppointment, defaultAppointments, Appointment } from "./Appointment";
import { ITask, defaultTasks, Task } from "./Task";
import { Chronotype, IChronotype, defaultChronotype } from "./Chronotype";
import {
  latestOf,
  Time,
  periodsOverlap,
  inStartOrder,
  End,
  Estimated
} from "./Time";
import { inPriorityOrder } from "./Todo";

export interface ISchedule {
  readonly appointments: IAppointment[];
  readonly chronotype: IChronotype;
  readonly tasks: ITask[];
}

export class Schedule implements ISchedule {
  readonly appointments: Appointment[];
  readonly chronotype: Chronotype;
  readonly tasks: Task[];
  readonly todos: Array<Appointment | Task>;

  constructor({ chronotype, appointments, tasks }: ISchedule) {
    this.chronotype = new Chronotype(chronotype);

    this.appointments = inStartOrder(
      ...appointments.map(appointment => new Appointment(appointment))
    );

    this.tasks = Schedule.mutations.stackTasks(
      Time.current(),
      this.chronotype,
      ...tasks.map(task => new Task(task))
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
    return end <= chronotype.endOf(end);
  }

  /**
   * Determines if the todo can be within the a single Chronotype period
   */
  static canBeCompletedWithinOneDay(
    { estimate }: Estimated,
    { minutes }: Chronotype
  ) {
    return estimate <= minutes;
  }

  //
  // Mutations
  //

  static readonly mutations = {
    stackTasks: function(
      start: Date,
      chronotype: Chronotype,
      ...tasks: Task[]
    ) {
      let lastIncomplete: Task | undefined = undefined;
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
          chronotype.startOf(start),
          (lastIncomplete || { end: start }).end
        );

        current.priority = start.getTime();

        if (
          !Schedule.canBeCompletedSameDay(current, chronotype) &&
          Schedule.canBeCompletedWithinOneDay(current, chronotype)
        ) {
          // Task cannot be completed today, so move it to tomorrow
          start = chronotype.startOf(Time.dayAfter(start));
          current.priority = start.getTime();
        }
      }

      return inPriorityOrder(...tasks);
    },

    scheduleTasks: function(
      chronotype: Chronotype,
      appointments: Appointment[],
      tasks: Task[]
    ) {
      const result = inPriorityOrder(...[...appointments, ...tasks]);

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
