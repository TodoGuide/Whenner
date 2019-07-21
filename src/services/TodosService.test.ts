import { TodosService } from "./TodosService";
import { customMatchers } from "../test/matchers";
import { Time } from "../models/time";
import { defaultChronotype } from "../models/Chronotype";
import { oneHourTask, oneHourAppointment } from "../test/data";
import { ITask } from "../models/Task";
import { TasksService } from "./TasksService";
import { AppointmentsService } from "./AppointmentsService";
import { IAppointment } from "../models/Appointment";
import { toTask, toAppointment } from "../models/Schedule";

describe("The TodosService", () => {
  let todosService: TodosService;

  beforeEach(() => {
    todosService = new TodosService(defaultChronotype);
    jasmine.addMatchers(customMatchers);
    Time.set(new Date(2019, 6, 5, 12, 0, 0, 0)); // 2019-07-05 at Noon
  });

  describe("Given a Task", () => {
    let task: ITask;
    beforeEach(() => {
      task = { ...oneHourTask };
    });

    describe("When the task is passed to upsert, it...", () => {
      let tasksService: TasksService;
      let appointmentsService: AppointmentsService;
      beforeEach(async () => {
        tasksService = new TasksService(defaultChronotype);
        appointmentsService = new AppointmentsService();
        await todosService.upsert(task);
      });

      it('Adds it to the tasks list', async () => {
        expect(await tasksService.byId(Time.now())).toEqual(task);
      });

      it('Does NOT add it to the appointments list', async () => {
        expect(await appointmentsService.byId(Time.now())).toBeFalsy();
      });
    });
  });

  describe("Given a Task created from an Appointment", () => {
    let task: ITask;
    beforeEach(() => {
      task = toTask({ ...oneHourAppointment });
    });

    describe("When the task is passed to upsert, it...", () => {
      let tasksService: TasksService;
      let appointmentsService: AppointmentsService;
      beforeEach(async () => {
        tasksService = new TasksService(defaultChronotype);
        appointmentsService = new AppointmentsService();
        await todosService.upsert(task);
      });

      it('Adds it to the tasks list', async () => {
        expect(await tasksService.byId(Time.now())).toEqual(task);
      });

      it('Does NOT add it to the appointments list', async () => {
        expect(await appointmentsService.byId(Time.now())).toBeFalsy();
      });
    });
  });

  describe("Given an Appointment", () => {
    let appointment: IAppointment;
    beforeEach(() => {
      appointment = { ...oneHourAppointment };
    });

    describe("When the appointment is passed to upsert, it...", () => {
      let tasksService: TasksService;
      let appointmentsService: AppointmentsService;
      beforeEach(async () => {
        tasksService = new TasksService(defaultChronotype);
        appointmentsService = new AppointmentsService();
        await todosService.upsert(appointment);
      });

      it('Adds it to the appointments list', async () => {
        expect(await appointmentsService.byId(Time.now())).toEqual(appointment);
      });

      it('Does NOT add it to the tasks list', async () => {
        expect(await tasksService.byId(Time.now())).toBeFalsy();
      });
    });
  });

  describe("Given an Appointment created from a Task", () => {
    let appointment: IAppointment;
    beforeEach(() => {
      appointment = toAppointment({ ...oneHourTask });
    });

    describe("When the appointment is passed to upsert, it...", () => {
      let tasksService: TasksService;
      let appointmentsService: AppointmentsService;
      beforeEach(async () => {
        tasksService = new TasksService(defaultChronotype);
        appointmentsService = new AppointmentsService();
        await todosService.upsert(appointment);
      });

      it('Adds it to the appointments list', async () => {
        expect(await appointmentsService.byId(Time.now())).toEqual(appointment);
      });

      it('Does NOT add it to the tasks list', async () => {
        expect(await tasksService.byId(Time.now())).toBeFalsy();
      });
    });
  });
});
