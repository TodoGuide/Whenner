import { IAppointment, defaultAppointments, Appointment } from "./Appointment";
import { ITask, defaultTasks, Task } from "./Task";
import { Chronotype, IChronotype } from "./Chronotype";
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
  readonly tasks: ITask[];
}

export class Schedule implements ISchedule {
  readonly appointments: Appointment[];
  readonly tasks: Task[];
  readonly chronotype: Chronotype;
  readonly todos: Array<Appointment | Task>;

  constructor(chronotype: IChronotype, { appointments, tasks }: ISchedule) {
    this.chronotype = new Chronotype(chronotype);

    this.appointments = inStartOrder(
      ...appointments.map(appointment => new Appointment(appointment))
    );

    this.tasks = Schedule.mutations.stackTasks(
      Time.current(),
      this.chronotype,
      ...tasks.map(task => new Task(task))
    );

    console.log("First task in stack", this.tasks[0]);

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

        // Only stack incomplete Tasks

        if (!current.completed) {
          start = latestOf(start, chronotype.startOf(start), (lastIncomplete || { end: start }).end)
          current.priority = start.getTime();

          if (
            !Schedule.canBeCompletedSameDay(current, chronotype) &&
            Schedule.canBeCompletedWithinOneDay(current, chronotype)
          ) {
            // Task cannot be completed today, so move it to tomorrow
            current.priority = chronotype
              .startOf(new Date(current.priority))
              .getTime();
          }
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
      for (let i = 0; i < result.length; i++) {
        const isAppointment = (todo: any) => appointments.indexOf(todo, i) >= 0;
        const current = result[i];
        const next = result[i + 1];

        if (current.completed || isAppointment(current)) {
          // Don't change completed items or appointments
          continue;
        }

        // `current` is an incomplete Task

        console.log("checking next and periods overlap", { current, next });
        if (next && periodsOverlap(current, next)) {
          console.log("next and periods overlap", { current, next });
          const nextStartDate = isAppointment(next) ? next.end : current.start;
          const currentTaskIndex = tasks.indexOf(current as any);
          const remainingTasks = tasks.slice(currentTaskIndex);
          Schedule.mutations.stackTasks(nextStartDate, chronotype, ...remainingTasks);
        }
      }

      return result;
    }
  };
}

export const defaultSchedule: ISchedule = {
  tasks: defaultTasks,
  appointments: defaultAppointments
};
