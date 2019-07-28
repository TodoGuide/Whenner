/**
 * Something with a numeric priority.
 */
export interface Priority {
  readonly priority: number;
}

/**
 * A function that takes an object and returns a numeric priority
 */
export interface Prioritizer<T = {}> { 
    (item: T): number;
}

/**
 * Returns a numeric priority for the given Priority object
 * @param item The item to have its priority determined
 */
export const prioritizer: Prioritizer<Priority> = (item) => item.priority;

/**
 * The given set of objects, ordered by their numeric priority
 * @param prioritizer The Prioritizer function
 * @param priorities The items to prioritize
 */
export function prioritize<T>(prioritizer: Prioritizer<T>, ...priorities: T[]) {
  return priorities.sort((a, b) => prioritizer(a) - prioritizer(b));
}

// type Constructor<T = {}> = new (...args: any[]) => T;

// function Prioritized<TBase extends Constructor>(Base: TBase, prioritizer: Prioritizer) {
//   return class implements Priority {
//     priority = prioritizer(Base);
//   };
// }