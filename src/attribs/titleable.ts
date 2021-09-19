export default interface Titleable {
  readonly title: string;
}

export function isTitleable(candidate: any) {
  const result =
    candidate?.hasOwnProperty("title") && typeof candidate.title === "string";
  return result;
}
