// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright © 2021 James Tharpe

import Identifiable, { isIdentifiable } from "../services/Id";
import Cancelable from "./cancelable";

interface Describable {
  readonly description: string;
}

export interface Titleable {
  readonly title: string;
}

function isDescribable(candidate: any) {
  const result =
    candidate?.hasOwnProperty("description") &&
    typeof candidate.title === "string";
  return result;
}

function isTitleable(candidate: any) {
  const result =
    candidate?.hasOwnProperty("title") && typeof candidate.title === "string";
  return result;
}

export interface Article extends Identifiable, Titleable, Describable {}

/**
 * Something that needs to be done
 *
 * @export
 * @interface Todo
 * @extends {Article}
 */
export interface Todo extends Article, Cancelable {}

export function isArticle(candidate: any) {
  const result =
    isIdentifiable(candidate) &&
    isTitleable(candidate) &&
    isDescribable(candidate);
  return result;
}

export function isTodo(candidate: any) {
  const result = isArticle(candidate); //&& isCancelable(candidate);
  // console.log("isTodo", { candidate, result });
  return result;
}
