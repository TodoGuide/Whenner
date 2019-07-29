import { Todo } from "./Todo";
import { Period } from "./time/Period";

export interface Appointment extends Todo, Period {
}
