// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright (C) 2019  James Tharpe

/**
 * Something with a numeric priority.
 */
export interface Prioritizable {
  priority: number;
}

export function isPrioritizable(candidate: any) {
  return (
    candidate.hasOwnProperty("priority") &&
    typeof candidate.priority === "number"
  );
}

/**
 * A function that takes an object and returns a numeric priority
 */
export interface Prioritizer<T = {}> {
  (item: T): number;
}

/**
 * Returns a numeric priority for the given Priority object
 * @param prioritizable The item to have its priority determined
 */
export const prioritizer: Prioritizer<Prioritizable> = (prioritizable) =>
  prioritizable.priority;

/**
 * The given set of objects, ordered by their numeric priority
 * @param prioritizer The Prioritizer function
 * @param priorities The items to prioritize
 */
export function sortByPriority<T>(
  prioritizer: Prioritizer<T>,
  ...priorities: T[]
) {
  return priorities.sort((a, b) => prioritizer(a) - prioritizer(b));
}
