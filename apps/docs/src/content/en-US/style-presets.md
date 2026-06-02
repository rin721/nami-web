---
title: Style Presets
group: Guide
order: 3
---

# Style Presets

The component source stays the same while the visual skin changes through tokens. The default preset is a neutral community UI. The illustration preset adds thick strokes, offset shadows, paper-like surfaces, and hand-drawn background texture.

```html live
<div class="doc-style-live">
  <div>
    <h3>Default</h3>
    <rl-button>Primary</rl-button>
    <rl-chip checkbox selected>Selected</rl-chip>
  </div>
  <div class="rl-theme-illustration">
    <h3>Illustration</h3>
    <rl-button>Primary</rl-button>
    <rl-chip checkbox selected>Selected</rl-chip>
  </div>
</div>
```

## Preset API

```html
<rl-theme style-preset="default"></rl-theme>
<rl-theme style-preset="illustration"></rl-theme>
<rl-theme style-preset="ant-illustration"></rl-theme>
```

`ant-illustration` remains a compatibility alias. The public behavior is the same as `illustration`.

