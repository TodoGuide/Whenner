import { Estimated } from "./Time";

export interface Id {
  id: number;
}

export interface Title {
  title: string;
}

export interface Description {
  description: string;
}

export interface Article extends Id, Title, Description {}

export interface Priority {
  priority: number;
}

export interface Todo extends Article, Priority {
  priority: number; // TODO: Only tasks should have priority
  completed?: Date;
  // Predecessors: number[];
}

export interface EstimatedTodo extends Todo, Estimated {}

export function inPriorityOrder<T extends Priority>(...priorities: T[]) {
  return priorities.sort((a, b) => a.priority - b.priority);
}
