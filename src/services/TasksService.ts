import { Chronotype } from "../models/Chronotype";
import { schedule } from "../models/scheduler";
import { defaultTasks } from "../models/TaskEvent";
import { Task } from "../models/Task";
import { localStorageCrud } from "./crud/local-storage";
import { Crud } from "./crud";

export const TASKS_KEY = "Whenner.Tasks";

export class TasksService {
  static create(chronotype: Chronotype): Crud<Task> {
    const result = {
      ...localStorageCrud({
        key: TASKS_KEY,
        initialData: defaultTasks
      })
    };
    const { read, find } = result;
    result.read = async () => schedule(chronotype, ...(await read()));
    result.find = async (id: number) => find(id, await result.read());
    return result;
  }
}
