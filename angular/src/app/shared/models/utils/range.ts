export function* range(start: number, end: number): IterableIterator<number> {
  yield start;
  if (start === end) return;

  yield* range(start + 1, end);
}
