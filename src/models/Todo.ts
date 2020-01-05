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

/**
 * Anything with a title and description
 *
 * @export
 * @interface Article
 * @extends {Id}
 * @extends {Title}
 * @extends {Description}
 */
export interface Article extends Id, Title, Description {}

/**
 * Something that needs to be done
 *
 * @export
 * @interface Todo
 * @extends {Article}
 */
export interface Todo extends Article {
  readonly completed?: Date;
  readonly canceled?: Date;
}

export interface EstimatedTodo extends Todo, Estimated {}
