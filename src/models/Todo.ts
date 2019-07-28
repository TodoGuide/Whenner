import { Estimated } from "./time/Estimated";

export interface Id {
  readonly id: number;
}

export interface Title {
  readonly title: string;
}

export interface Description {
  readonly description: string;
}

export interface Article extends Id, Title, Description {}

export interface Priority {
  readonly priority: number;
}

export interface Todo extends Article, Priority {
  readonly priority: number; // TODO: Only tasks should have priority
  readonly completed?: Date;
  // Predecessors: number[];
}

export interface EstimatedTodo extends Todo, Estimated {}

export function inPriorityOrder<T extends Priority>(...priorities: T[]) {
  return priorities.sort((a, b) => a.priority - b.priority);
}
