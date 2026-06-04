import { namiComponentMetadata as a } from "./metadata.js";
const t = a.map((o) => ({
  name: o.name,
  category: o.category,
  anatomy: o.anatomy,
  states: o.states,
  styleHooks: o.styleHooks,
  tokens: o.tokens,
  parts: o.parts,
  slots: o.slots
}));
export {
  t as namiComponentAnatomy
};
