import { rlComponentMetadata } from './metadata';

export const rlComponentAnatomy = rlComponentMetadata.map((item) => ({
  name: item.name,
  category: item.category,
  anatomy: item.anatomy,
  states: item.states,
  styleHooks: item.styleHooks,
  tokens: item.tokens,
  parts: item.parts,
  slots: item.slots
}));

export type RlComponentAnatomy = (typeof rlComponentAnatomy)[number];
