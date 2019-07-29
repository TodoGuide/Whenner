import { StartEstimated } from "./time/Estimated";
import { Todo } from "./Todo";
import { Priority } from "./Priority";

export interface Task extends Todo, Priority, StartEstimated {
}
