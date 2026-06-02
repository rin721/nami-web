export interface SafeElementInternals {
  setFormValue?: ElementInternals['setFormValue'];
  setValidity?: ElementInternals['setValidity'];
}

export function attachInternalsSafe(host: HTMLElement): SafeElementInternals | null {
  try {
    return host.attachInternals();
  } catch {
    return null;
  }
}

export function setSafeFormValue(internals: SafeElementInternals | null, value: FormData | File | string | null) {
  if (typeof internals?.setFormValue === 'function') {
    internals.setFormValue(value);
  }
}

export function setSafeValidity(
  internals: SafeElementInternals | null,
  validity: ValidityStateFlags,
  message?: string,
  anchor?: HTMLElement
) {
  if (typeof internals?.setValidity === 'function') {
    internals.setValidity(validity, message, anchor);
  }
}
