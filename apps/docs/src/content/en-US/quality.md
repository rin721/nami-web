---
title: Quality
group: Reference
order: 6
---

# Quality

The release gate is `npm run verify`. It runs unit tests, package builds, custom-elements manifest generation, and browser tests.

## Covered Contracts

| Area | Contract |
| --- | --- |
| Theme | light, dark, custom accent, compact density, reduced motion |
| Style presets | default and illustration share the same component source |
| Forms | form-associated input and switch behavior |
| A11y | focus-visible, focus trap, Escape close, keyboard tabs |
| i18n | `@lit/localize` runtime mode, localized routes, fallback text |

```html live
<div class="doc-live-stack">
  <rl-dialog id="quality-dialog" label="Quality dialog">
    Focus management and overlay tokens are part of the browser contract.
    <rl-button slot="actions" variant="soft">Close</rl-button>
  </rl-dialog>
  <rl-button onclick="document.querySelector('#quality-dialog').open = true">Open dialog</rl-button>
</div>
```

The docs site itself is part of the test surface, so tutorial examples should stay small, stable, and token-driven.

