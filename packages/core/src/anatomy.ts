import { namiComponentMetadata } from './metadata';

export const namiComponentAnatomy = namiComponentMetadata.map((item) => ({
  name: item.name,
  category: item.category,
  anatomy: item.anatomy,
  states: item.states,
  styleHooks: item.styleHooks,
  tokens: item.tokens,
  parts: item.parts,
  slots: item.slots
}));

export type NamiComponentAnatomy = (typeof namiComponentAnatomy)[number];
