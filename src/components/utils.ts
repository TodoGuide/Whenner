import Id from "../services/Id";

export function eventKey(prefix: string, item: Id, index?: number) {
  return `${prefix}-${item.id}-${index}`;
}
