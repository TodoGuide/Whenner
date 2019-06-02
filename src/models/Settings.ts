import moment, { Duration } from "moment";


export interface Settings {
  dayStart: Duration;
  dayEnd: Duration;
}

export const defaultSettings: Settings = {
  dayStart: moment.duration('7:15'), // 7:15am
  dayEnd: moment.duration('20:00') // 7:00pm
}