export function logResult<T>(message: string, result: T) {
  console.log(message, result);
  return result;
}
