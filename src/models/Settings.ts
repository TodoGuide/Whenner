import { IChronotype, defaultChronotype } from "./Chronotype";


export interface Settings {
  chronotype: IChronotype;
  // ...
}

// Idea: Have multiple chronotyes, e.g. one for work, home, school, etc.
//   Tasks could then reference the chronotype to be appropriatly scheduled