---
title: Getting Started
group: Guide
order: 1
---

# Getting Started

Rin UI is a Lit-based Web Components library. It works in native HTML, Vue, React, and other frontend stacks because the public surface is standard custom elements, attributes, events, slots, CSS variables, and CSS parts.

## Install

```bash
npm install @rin-labs/ui @rin-labs/themes
```

## Register all components

```html live
<rl-button>Primary action</rl-button>
<rl-button variant="soft">Secondary action</rl-button>
<rl-chip checkbox selected value="docs">Docs</rl-chip>
```

```ts
import '@rin-labs/themes/default.css';
import '@rin-labs/ui/register';
```

## Import one component

```ts
import '@rin-labs/themes/default.css';
import '@rin-labs/ui/button';
```

Use the full register entry for documentation sites and prototypes. Use single component entries when an application needs a smaller dependency surface.

