export interface Priority {
  readonly priority: number;
}

export interface Prioritizer<T = {}> { 
    (item: T): number;
}

export const prioritizer: Prioritizer<Priority> = (item) => item.priority;

export function prioritize<T>(prioritizer: Prioritizer<T>, ...priorities: T[]) {
  return priorities.sort((a, b) => prioritizer(a) - prioritizer(b));
}

// type Constructor<T = {}> = new (...args: any[]) => T;

// function Prioritized<TBase extends Constructor>(Base: TBase, prioritizer: Prioritizer) {
//   return class implements Priority {
//     priority = prioritizer(Base);
//   };
// }