export function withSourceEvent<T extends Record<string, unknown>>(detail: T, sourceEvent: Event) {
  return {
    ...detail,
    sourceEvent
  };
}
