// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright (C) 2019  James Tharpe

import { Todo } from "./Todo";
import { Period } from "./time/Period";

/**
 * A {@link Todo} that needs to be completed within fixed start and end times. Unlike a {@link Task}, which is to be completed based on priority and duration.
 *
 * @export
 * @interface Appointment
 * @extends {Todo}
 * @extends {Period}
 */
export interface Appointment extends Todo, Period {}
