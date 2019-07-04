import { Chronotype, defaultChronotype } from "./Chronotype";


export interface Settings {
  chronotype: Chronotype;
  // ...
}

export const defaultSettings: Settings = {
  chronotype: defaultChronotype
}