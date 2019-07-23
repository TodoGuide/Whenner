import { IAppointment, defaultAppointments, Appointment } from "./Appointment";
import { ITask, defaultTasks, Task } from "./Task";
import { Chronotype, IChronotype } from "./Chronotype";
import { inStartOrder, Start, laterOf, Time, periodsOverlap } from "./time";
import { inPriorityOrder, Todo } from "./Todo";

export interface ISchedule {
  readonly appointments: IAppointment[];
  readonly tasks: ITask[];
}

export class Schedule implements ISchedule {
  readonly appointments: Appointment[];
  readonly tasks: Task[];
  readonly chronotype: Chronotype;

  constructor(chronotype: IChronotype, { appointments, tasks }: ISchedule) {
    this.chronotype = new Chronotype(chronotype);
    this.appointments = inStartOrder(
      ...appointments.map(appointment => new Appointment(appointment))
    );
    this.tasks = Schedule.mutations.stackTasks(
      this.chronotype.startOf(Time.current()),
      ...tasks.map(task => new Task(task))
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
      const todos = inPriorityOrder(...[...appointments, ...tasks]);
      for (let i = 0; i < todos.length; i++) {
        const isAppointment = (todo: any) => appointments.indexOf(todo, i) >= 0;
        const current = todos[i];
        const next = todos[i + 1];

        if (current.completed || isAppointment(current)) {
          // Don't change completed items or appointments
          continue;
        }

        // `current` is an incomplete Task

        if (next && periodsOverlap(current, next)) {
          const nextStartDate = isAppointment(next) ? next.end : current.start;
          const currentTaskIndex = tasks.indexOf(<any>current);
          const remainingTasks = tasks.slice(currentTaskIndex);
          Schedule.mutations.stackTasks(nextStartDate, ...remainingTasks);
        }
      }
    }
  };
}

export const defaultSchedule: ISchedule = {
  tasks: defaultTasks,
  appointments: defaultAppointments
};
