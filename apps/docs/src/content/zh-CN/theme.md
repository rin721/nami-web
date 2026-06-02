---
title: 主题引擎
group: 指南
order: 2
---

# 主题引擎

`rl-theme` 是视觉主题边界。它控制嵌套组件的 seed accent、主题模式、密度、动效和 style preset。

```html live
<rl-theme accent="#14b8a6" theme="light" density="comfortable">
  <div class="doc-live-stack">
    <rl-button>保存修改</rl-button>
    <rl-input label="搜索" placeholder="试试 token 名称"></rl-input>
    <rl-switch checked>启用</rl-switch>
  </div>
</rl-theme>
```

## Token 层级

| 层级 | 示例 | 作用 |
| --- | --- | --- |
| Seed | `--rl-accent-50`, `--rl-motion-normal` | 品牌和动效输入 |
| Semantic | `--rl-color-primary`, `--rl-surface`, `--rl-text` | 跨组件共享语义 |
| Component | `--rl-button-bg`, `--rl-chip-selected-bg` | 单组件覆盖边界 |

hover、selected、focus、switch checked 和 loading indicator 都应该跟随同一个 accent seed。

