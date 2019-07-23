import { IAppointment, defaultAppointments, Appointment } from "./Appointment";
import { ITask, defaultTasks, Task } from "./Task";
import { Chronotype, IChronotype } from "./Chronotype";
import { laterOf, Time, periodsOverlap, inStartOrder } from "./Time";
import { inPriorityOrder, Todo } from "./Todo";

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
      laterOf(Time.current(), this.chronotype.startOf(Time.current())),
      ...tasks.map(task => new Task(task))
    );

    this.todos = Schedule.mutations.scheduleTasks(
      this.chronotype,
      this.appointments,
      this.tasks
    );
  }

  static readonly mutations = {
    stackTasks: function(start: Date, ...tasks: Task[]) {
      let lastIncomplete: Task | undefined = undefined;
      for (let i = 0; i < tasks.length; i++) {
        const previous = tasks[i - 1];
        const current = tasks[i];
        lastIncomplete =
          previous && previous.completed ? lastIncomplete : previous;
        if (!current.completed) {
          current.priority = laterOf(
            start,
            (lastIncomplete || { end: start }).end
          ).getTime();
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

        console.log("checking next and periods overlap", { current, next })
        if (next && periodsOverlap(current, next)) {
          console.log("next and periods overlap", { current, next })
          const nextStartDate = isAppointment(next) ? next.end : current.start;
          const currentTaskIndex = tasks.indexOf(<any>current);
          const remainingTasks = tasks.slice(currentTaskIndex);
          Schedule.mutations.stackTasks(nextStartDate, ...remainingTasks);
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
