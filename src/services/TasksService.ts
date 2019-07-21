import { IChronotype } from "../models/Chronotype";
import { schedule } from "../models/scheduler";
import { Time } from "../models/time";
import { ITask, defaultTasks } from "../models/Task";
import { LocalStorageService } from "./LocalStorageService";
import { LocalStorageCrudService } from "./LocalStorageCrudService";

export const TASKS_KEY = "Whenner.Tasks";

export class TasksService extends LocalStorageCrudService<ITask[]> {
  constructor(public chronotype: IChronotype) {
    super(TASKS_KEY, defaultTasks);
  }

  async all() {
    return schedule(this.chronotype, ...(await super.all()));
  }
}
