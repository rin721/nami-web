export const rlParts = [
  'base',
  'control',
  'icon',
  'label',
  'description',
  'indicator',
  'actions',
  'header',
  'footer',
  'body',
  'backdrop',
  'rail',
  'top',
  'bottom',
  'image',
  'illustration'
] as const;

export const rlSlots = [
  'default',
  'icon',
  'header',
  'label',
  'title',
  'description',
  'actions',
  'footer',
  'body',
  'illustration',
  'rail',
  'top',
  'bottom'
] as const;

export type RlPart = (typeof rlParts)[number];
export type RlSlot = (typeof rlSlots)[number];
