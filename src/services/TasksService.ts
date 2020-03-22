import { Chronotype } from "../models/Chronotype";
import { schedule } from "../models/scheduler";
import { Task } from "../models/Task";
import { localStorageCrud } from "./crud/local-storage";
import { Crud } from "./crud";

export const TASKS_KEY = "Whenner.Tasks";

export class TasksService {
  static create(chronotype: Chronotype): Crud<Task> {
    const result = {
      ...localStorageCrud({
        key: TASKS_KEY,
        initialData: [] as Task[]
      })
    };
    const { read } = result;
    result.read = async () => schedule(chronotype, ...(await read()));
    // result.find = async (id: number) => find(id, await result.read());
    return result;
  }
}

// export class TasksService2 {
//   private crud: Crud<Task> =

//   constructor(chronotype: Chronotype){

//   }
// }
