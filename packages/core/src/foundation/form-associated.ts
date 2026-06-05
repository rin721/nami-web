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

export function requiredTextValidity(value: string, label = 'Field') {
  const missing = value.length === 0;
  return {
    flags: missing ? { valueMissing: true } : {},
    message: missing ? `${label} is required` : undefined
  } satisfies { flags: ValidityStateFlags; message?: string };
}

export function requiredCheckedValidity(checked: boolean, message = 'This field is required') {
  return {
    flags: checked ? {} : { valueMissing: true },
    message: checked ? undefined : message
  } satisfies { flags: ValidityStateFlags; message?: string };
}
