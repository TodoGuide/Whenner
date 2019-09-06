// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright (C) 2019  James Tharpe

import { Estimated } from "./time/Estimated";
import { Todo } from "./Todo";
import { Priority } from "./Priority";

export interface Task extends Todo, Priority, Estimated {}
