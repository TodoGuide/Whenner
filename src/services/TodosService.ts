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
  constructor(private todos: ITodo[] = readTodos()) {}

  private async update(todo: ITodo): Promise<ITodo | undefined> {
    const result = await this.byId(todo.id);
    if(result){
      this.todos[this.todos.indexOf(result)] = { ...todo };
    }
    return result;
  }

  async upsert(todo: ITodo): Promise<ITodo> {
    
    if (!await this.update(todo)) {
      this.todos.push({ ...todo });
    }

    const result = await this.byId(todo.id);
    if(!result){
      throw new Error("Failed to upsert todo");
    }

    await writeTodos(this.todos);
    return result;
  }

  async byId(id: number): Promise<ITodo | undefined> {
    return (await this.byIds(id))[0];
  }

  async byIds(...ids: number[]): Promise<ITodo[]> {
    const result = ids.map(id => this.todos.find(todo => todo.id === id)) || [];
    return result.filter(Boolean) as ITodo[];
  }

  async all() {
    return this.todos = await readTodos();
  }
}

export const todosService = new TodosService();