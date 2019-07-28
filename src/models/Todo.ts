import { Estimated } from "./time/Estimated";
import { Priority, Prioritizer } from "./Priority";

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

export interface Todo extends Article {
  readonly completed?: Date;
  // Predecessors: number[];
}

export interface EstimatedTodo extends Todo, Estimated {}
