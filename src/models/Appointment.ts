// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright (C) 2019  James Tharpe

import { Todo } from "./Todo";
import { Period } from "./time/Period";

/**
 * Something to be done in a fixed period of time.
 *
 * @export
 * @interface Appointment
 * @extends {Todo}
 * @extends {Period}
 */
export interface Appointment extends Todo, Period {}
