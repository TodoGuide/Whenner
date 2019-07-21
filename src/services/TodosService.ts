import { CrudService } from "./LocalStorageCrudService";
import { Todo, Id } from "../models/Todo";
import { TasksService } from "./TasksService";
import { IChronotype } from "../models/Chronotype";
import { AppointmentsService } from "./AppointmentsService";

export class TodosService implements CrudService<Todo[]> {
  private readonly _tasksService: TasksService;
  private readonly _appointmentsService: AppointmentsService;

  constructor(chronotype: IChronotype) {
    this._tasksService = new TasksService(chronotype);
    this._appointmentsService = new AppointmentsService();
  }

  upsert<TTodo extends Id>(todo: TTodo): Promise<TTodo> {
    if (isTask(todo)) {
      return this._tasksService.upsert(todo);
    } else if (isAppointment(todo)) {
      return this._appointmentsService.upsert(todo);
    }

    throw Error("Item is not a Todo, Task, or Appointment");
  }

  async byId<TTodo extends Id>(id: number): Promise<TTodo | undefined> {
    return (
      (await this._tasksService.byId(id)) ||
      (await this._appointmentsService.byId(id))
    );
  }

  async byIds<TItem extends Id>(...ids: number[]): Promise<TItem[]> {
    return [
      ...(await this._tasksService.byIds(...ids)),
      ...(await this._appointmentsService.byIds(...ids))
    ] as TItem[];
  }

  async read(): Promise<Todo[]> {
    return [
      ...(await this._tasksService.read()),
      ...(await this._appointmentsService.read())
    ] as Todo[];
  }
}
