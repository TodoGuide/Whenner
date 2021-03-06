// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright (C) 2019  James Tharpe

import { Appointment } from "./Appointment";
import { Task } from "./Task";

export interface Event extends Task, Appointment {}
