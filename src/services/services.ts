// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright (C) 2019  James Tharpe

import { EventsService } from "./EventsService";
import { defaultChronotype } from "../models/Chronotype";

export const eventsService = EventsService.create(defaultChronotype);
