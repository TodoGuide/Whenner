// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright (C) 2019  James Tharpe

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
