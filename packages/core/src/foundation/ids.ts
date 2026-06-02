const counters = new Map<string, number>();

export function nextId(prefix: string) {
  const next = (counters.get(prefix) ?? 0) + 1;
  counters.set(prefix, next);
  return `${prefix}-${next}`;
}
