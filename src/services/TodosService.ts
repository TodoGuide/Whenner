import { ITodo } from "../models/Todo";

const TODOS_KEY = "Whenner.Todos";

export const defaultTodos: ITodo[] = [
  {
    id: 1,
    title: "Get started with Whenner",
    description: "Click stuff, learn how the app works",
    estimate: 5,
    start: new Date(),
    done: false
  }
];

function readTodos(): ITodo[] {
    return JSON.parse(localStorage.getItem(TODOS_KEY) || "null") || defaultTodos;
}

async function writeTodos(todos: ITodo[]): Promise<ITodo[]> {
  localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
  return todos;
}

export class TodosService {
  constructor() {}

  private async update(todo: ITodo): Promise<ITodo | undefined> {
    const todos = await this.all();
    const existing = todos.find(t => t.id === todo.id);
    if(existing){
      const result = { ...todo };
      todos[todos.indexOf(existing)] = result;
      await writeTodos(todos);
      return result;
    }
  }

  private async insert(todo: ITodo): Promise<ITodo> {
    const todos = await readTodos();
    const existing = todos.find(t => t.id === todo.id);
    if(existing){
      throw new Error(`Cannot insert todo with ID ${todo.id} because it already exists`);
    }
    const result = { ...todo };
    todos.push(result);
    await writeTodos(todos);
    return result;
  }

  async upsert(todo: ITodo): Promise<ITodo> {
    return await this.update(todo) || await this.insert(todo);
  }

  async byId(id: number): Promise<ITodo | undefined> {
    return (await this.byIds(id))[0];
  }

  async byIds(...ids: number[]): Promise<ITodo[]> {
    const todos = await this.all();
    const result = ids.map(id => todos.find(todo => todo.id === id)) || [];
    return result.filter(Boolean) as ITodo[];
  }

  async all() {
    return await readTodos();
  }
}

export const todosService = new TodosService();