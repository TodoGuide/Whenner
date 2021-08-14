// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright © 2021  James Tharpe

import Identifiable, { isIdentifiable } from "../services/Id";
import Cancelable, { isCancelable } from "./cancelable";

interface Describable {
  readonly description: string;
}

export interface Titleable {
  readonly title: string;
}

function isDescribable(candidate: any) {
  return (
    candidate?.hasOwnProperty("description") &&
    typeof candidate.title === "string"
  );
}

function isTitleable(candidate: any) {
  return (
    candidate?.hasOwnProperty("title") && typeof candidate.title === "string"
  );
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
  return (
    isIdentifiable(candidate) &&
    isTitleable(candidate) &&
    isDescribable(candidate)
  );
}

export function isTodo(candidate: any) {
  return isArticle(candidate) && isCancelable(candidate);
}
