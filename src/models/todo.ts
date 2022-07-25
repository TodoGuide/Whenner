// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright © 2021 James Tharpe

import Describable, { isDescribable } from "./attributes/describable";
import Identifiable, { isIdentifiable } from "./attributes/identifiable";
import Titleable, { isTitleable } from "./attributes/titleable";
import Cancelable, { isCancelable } from "./attributes/cancelable";

/**
 * An identifiable document with a title
 */
export interface Article extends Identifiable, Titleable, Describable {}

/**
 * Something that needs to be done
 *
 * @export
 * @interface Todo
 * @extends {Article}
 */
export default interface Todo extends Article, Cancelable {}

export function isArticle(candidate: unknown): boolean {
	const result =
		isIdentifiable(candidate) &&
		isTitleable(candidate) &&
		isDescribable(candidate);
	return result;
}

export function isTodo(candidate: unknown): boolean {
	const result = isArticle(candidate) && isCancelable(candidate);
	return result;
}
