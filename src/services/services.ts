// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright (C) 2019 James Tharpe

import { defaultChronotype } from "../models/Chronotype";
import { EventsService } from "./EventsService";

export const eventsService = EventsService.create(defaultChronotype);
