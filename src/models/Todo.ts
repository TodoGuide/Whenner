import { Estimated } from "./time/Estimated";
import Id from "../services/Id";

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
