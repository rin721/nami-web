export function emit<T>(
  host: HTMLElement,
  type: string,
  detail?: T,
  options: Omit<CustomEventInit<T>, 'detail'> = {}
) {
  return host.dispatchEvent(
    new CustomEvent<T>(type, {
      bubbles: true,
      composed: true,
      ...options,
      detail
    })
  );
}
