export default interface Id {
  readonly id: number;
}

export interface IdGenerator {
  (): number;
}