// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright © 2021 James Tharpe

import Cancelable from "../attribs/cancelable";
import Describable, { isDescribable } from "../attribs/describable";
import Titleable, { isTitleable } from "../attribs/titleable";
import Identifiable, { isIdentifiable } from "../attribs/identifiable";

export interface Article extends Identifiable, Titleable, Describable {}

/**
 * Something that needs to be done
 *
 * @export
 * @interface Todo
 * @extends {Article}
 */
export default interface Todo extends Article, Cancelable {}

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
