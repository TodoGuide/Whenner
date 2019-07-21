import { IChronotype } from "../models/Chronotype";
import { schedule } from "../models/scheduler";
import { Time } from "../models/time";
import { ITask, defaultTasks } from "../models/Task";

export const TASKS_KEY = "Whenner.Tasks";

async function readTasks(): Promise<ITask[]> {
  return new Promise((resolve, reject) => {
    // Simulate slow read
    setTimeout(function() {
      resolve(
        JSON.parse(localStorage.getItem(TASKS_KEY) || "null") || defaultTasks
      );
    }, 0);
  });
}

async function writeTasks(tasks: ITask[]): Promise<ITask[]> {
  return new Promise((resolve, reject) => {
    // Simulate slow write
    setTimeout(function() {
      localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
      resolve(tasks);
    }, 0);
  });
}

export class TasksService {
  private async update(task: ITask): Promise<ITask | undefined> {
    const tasks = await this.all();
    const existing = tasks.find(t => t.id === task.id);
    if (existing) {
      tasks[tasks.indexOf(existing)] = { ...task };
      await writeTasks(schedule(this.chronotype, ...tasks));
      return await this.byId(task.id);
    }
  }

  private async insert(todo: ITask): Promise<ITask> {
    const existing = await this.byId(todo.id);
    if (existing) {
      throw new Error(
        `Cannot insert todo with ID ${todo.id} because it already exists`
      );
    }
    const tasks = await this.all();
    const insertTodo = { ...todo, id: Time.now() };
    tasks.push(insertTodo);
    await writeTasks(schedule(this.chronotype, ...tasks));
    return (await this.byId(insertTodo.id)) || insertTodo;
  }

  constructor(public chronotype: IChronotype) {}

  async upsert(todo: ITask): Promise<ITask> {
    return (await this.update(todo)) || (await this.insert(todo));
  }

  async byId(id: number): Promise<ITask | undefined> {
    return (await this.byIds(id))[0];
  }

  async byIds(...ids: number[]): Promise<ITask[]> {
    const tasks = await this.all();
    const result = ids.map(id => tasks.find(task => task.id === id)) || [];
    return result.filter(Boolean) as ITask[];
  }

  async all() {
    return schedule(this.chronotype, ...(await readTasks()));
  }
}
