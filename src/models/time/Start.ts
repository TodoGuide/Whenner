export interface Start {
  readonly start: Date;
}
export function inStartOrder<T extends Start>(...starts: T[]) {
  return starts.sort((a, b) => a.start.getTime() - b.start.getTime());
}
