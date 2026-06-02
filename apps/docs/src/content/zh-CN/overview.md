---
title: 总览
group: 指南
order: 0
---

# 总览

Rin UI 是一套 Web Components UI 组件库，适合需要在多个前端技术栈中复用同一套组件源码的应用。公共边界是自定义元素、反射属性、DOM 事件、slots、CSS Parts 和 CSS Variables。

## 第一阶段包含什么

| 模块 | 含义 |
| --- | --- |
| 组件 | Button、Chip、Input、Switch、Card、Tab、浮层、应用壳和状态反馈 |
| 主题 | 浅色、暗色、自定义主题色、紧凑密度、减少动效 |
| 皮肤 | 默认社区风格，以及同一套 token 驱动的插画风格 |
| i18n | `@lit/localize` runtime mode、语言前缀路由和组件 fallback 文案 |

```html live
<div class="doc-live-stack">
  <rl-button>安装 Rin UI</rl-button>
  <rl-chip checkbox selected>Web Components</rl-chip>
  <rl-radio-card selected label="可替换皮肤" description="切换 style preset，不修改组件源码。"></rl-radio-card>
</div>
```

