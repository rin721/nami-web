---
title: 语义结构
group: 指南
order: 3.6
---

# 语义结构

每个公开组件都会暴露机器可读结构：

| 字段 | 含义 |
| --- | --- |
| category | 组件在设计系统中的角色 |
| anatomy | 稳定 CSS parts，例如 base、control、label、indicator、actions、backdrop |
| states | 支持的视觉状态，例如 hover、active、focus-visible、disabled、selected、loading、open、error |
| styleHooks | 某个 part 在某个 state 下受哪些 token 影响 |

```html live
<rl-card>
  <rl-badge slot="header" variant="primary">结构</rl-badge>
  <rl-input label="搜索" helper-text="label、control、description、error parts 都会被文档化。"></rl-input>
  <rl-radio-card selected label="选中状态" description="selected 状态的 token 会进入组件 metadata。"></rl-radio-card>
</rl-card>
```

这能让定制边界更明确。主题作者应优先改 tokens，其次用 CSS Parts，slots 只用于内容结构。
