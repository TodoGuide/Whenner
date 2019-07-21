import { LocalStorageService } from "./LocalStorageService";
import { Id } from "../models/Todo";
import { Time } from "../models/time";


export class LocalStorageCrudService<T extends Array<Id>> extends LocalStorageService<T> {

  private async update<TItem extends Id>(item: Id): Promise<TItem | undefined> {
    const items = await this.all();
    const existing = items.find(existing => existing.id === item.id);
    if (existing) {
      items[items.indexOf(existing)] = { ...item };
      await this.write(items);
      return await this.byId(item.id);
    }
  }

  private async insert<TItem extends Id>(item: TItem): Promise<TItem> {
    const existing = await this.byId(item.id);
    if (existing) {
      throw new Error(
        `Cannot insert todo with ID ${item.id} because it already exists`
      );
    }
    const items = await this.all();
    const insertTodo = { ...item, id: Time.now() };
    items.push(insertTodo);
    await this.write(items);
    return (await this.byId(insertTodo.id)) || insertTodo;
  }

  constructor(key: string, defaultReadValue: T){
    super(key, defaultReadValue);
  }

  async all(): Promise<T> {
    return await this.read();
  }

  async upsert<TItem extends Id>(item: TItem): Promise<TItem> {
    return (await this.update(item)) || (await this.insert(item));
  }

  async byId<TItem extends Id>(id: number): Promise<TItem | undefined> {
    return (await this.byIds<TItem>(id))[0];
  }

  async byIds<TItem extends Id>(...ids: number[]): Promise<TItem[]> {
    const tasks = await this.all();
    const result = ids.map(id => tasks.find(item => item.id === id)) || [];
    return result.filter(Boolean) as TItem[];
  }
}