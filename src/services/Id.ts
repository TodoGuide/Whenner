// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright (C) 2019  James Tharpe

export default interface Identifiable {
  readonly id: number; // TODO: or string
}

export interface IdGenerator {
  (): number;
}

export function isIdentifiable(thing: any) {
  return thing?.hasOwnProperty("id");
}
