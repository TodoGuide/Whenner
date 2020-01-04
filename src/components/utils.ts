import Id from "../services/Id";

export function itemKey(prefix: string, item: Id, index?: number) {
  return `${prefix}-${item.id}-${index || "0"}`;
}
