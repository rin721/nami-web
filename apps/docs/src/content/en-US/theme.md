---
title: Theme Engine
group: Guide
order: 2
---

# Theme Engine

`rl-theme` is the theme boundary. It controls the seed accent, theme mode, density, motion, and style preset for all nested components.

```html live
<rl-theme accent="#14b8a6" theme="light" density="comfortable">
  <div class="doc-live-stack">
    <rl-button>Save changes</rl-button>
    <rl-input label="Search" placeholder="Try a token name"></rl-input>
    <rl-switch checked>Enabled</rl-switch>
  </div>
</rl-theme>
```

## Token Layers

| Layer | Examples | Purpose |
| --- | --- | --- |
| Seed | `--rl-accent-50`, `--rl-motion-normal` | Brand and motion inputs |
| Semantic | `--rl-color-primary`, `--rl-surface`, `--rl-text` | Shared meaning |
| Component | `--rl-button-bg`, `--rl-chip-selected-bg` | Per-component control |

Interactive states are expected to follow the same accent seed: hover, selected, focus, switch checked, and loading indicators.

