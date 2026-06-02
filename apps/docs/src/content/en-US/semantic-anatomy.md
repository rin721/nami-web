---
title: Semantic Anatomy
group: Guide
order: 3.6
---

# Semantic Anatomy

Every public component exposes a machine-readable structure:

| Field | Meaning |
| --- | --- |
| category | The role of the component in the design system |
| anatomy | Stable CSS parts such as base, control, label, indicator, actions, or backdrop |
| states | Supported visual states such as hover, active, focus-visible, disabled, selected, loading, open, or error |
| styleHooks | The tokens that affect a part in a state |

```html live
<rl-card>
  <rl-badge slot="header" variant="primary">Anatomy</rl-badge>
  <rl-input label="Search" helper-text="The label, control, description, and error parts are documented."></rl-input>
  <rl-radio-card selected label="Selected state" description="Selected tokens are listed in component metadata."></rl-radio-card>
</rl-card>
```

This structure keeps customization explicit. Theme authors should prefer tokens first, CSS Parts second, and only use slots for content structure.
