export default interface Describable {
  readonly description: string;
}

export function isDescribable(candidate: any) {
  const result =
    candidate?.hasOwnProperty("description") &&
    typeof candidate.description === "string";
  return result;
}
