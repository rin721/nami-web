---
title: Components
group: Reference
order: 4
---

# Components

Component APIs are generated from the library metadata below this tutorial section. Each component documents attributes, properties, events, slots, CSS parts, and token hooks.

```html live
<div class="doc-live-stack">
  <rl-tab-bar value="Overview">
    <button value="Overview">Overview</button>
    <button value="Tokens">Tokens</button>
    <button value="Motion">Motion</button>
  </rl-tab-bar>
  <rl-radio-card selected label="Token driven" description="The selected state follows the active accent."></rl-radio-card>
  <rl-empty title="No results" description="Try changing filters.">
    <rl-button slot="actions" variant="soft">Create item</rl-button>
  </rl-empty>
</div>
```

## Customization

Use slots for content, CSS parts for internal styling boundaries, and CSS variables for theme-level customization.
