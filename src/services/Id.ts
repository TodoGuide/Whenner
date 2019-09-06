// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright (C) 2019  James Tharpe

export default interface Id {
  readonly id: number;
}

export interface IdGenerator {
  (): number;
}
