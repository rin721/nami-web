---
title: Theme Algorithm
group: Guide
order: 3.5
---

# Theme Algorithm

Rin UI themes are deterministic. A small seed becomes a complete token set through one path:

| Layer | Purpose |
| --- | --- |
| Seed | User choices such as accent, mode, radius, density, motion, contrast, and style preset |
| Palette / Map | Derived accent tones and neutral support values |
| Semantic | Meaningful roles such as primary, surface, text, border, focus, and overlay |
| Component | Per-component hooks such as button background, chip selected background, and dialog shadow |
| Style | Preset identity such as illustration ink, paper, stroke, doodle, and offset shadow |

```html live
<rl-theme accent="#14b8a6" theme="dark" style-preset="illustration" radius="soft" contrast="high">
  <rl-card>
    <rl-badge slot="header" variant="primary">Algorithmic</rl-badge>
    <rl-button>Primary</rl-button>
    <rl-chip checkbox selected value="theme">Selected token</rl-chip>
  </rl-card>
</rl-theme>
```

Use `@rin-labs/tokens/theme` when a tool needs to inspect the same contract outside the browser.

```ts
import { deriveRinTheme, themeToCssText } from '@rin-labs/tokens/theme';

const theme = deriveRinTheme({
  accent: '#14b8a6',
  mode: 'dark',
  stylePreset: 'illustration',
  radius: 'soft',
  contrast: 'high'
});

const css = themeToCssText(theme, '.my-rin-theme');
```

The algorithm is CSS-first. It does not call an AI service. It simply makes the design system legible enough for people and tools to reason about.
