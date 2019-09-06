// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright (C) 2019  James Tharpe

import { TasksService } from "./TasksService";
import { defaultChronotype } from "../models/Chronotype";
import { AppointmentsService } from "./AppointmentsService";

export const tasksService = TasksService.create(defaultChronotype);
export const appointmentsService = AppointmentsService.create();