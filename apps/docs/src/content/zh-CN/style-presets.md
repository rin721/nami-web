---
title: 风格 Preset
group: 指南
order: 3
---

# 风格 Preset

组件源码保持不变，视觉皮肤通过 tokens 切换。默认 preset 是中性的社区组件风格。插画 preset 增加粗描边、偏移阴影、纸张表面和手绘背景纹理。

```html live
<div class="doc-style-live">
  <div>
    <h3>默认</h3>
    <rl-button>主要操作</rl-button>
    <rl-chip checkbox selected>已选择</rl-chip>
  </div>
  <div class="rl-theme-illustration">
    <h3>插画</h3>
    <rl-button>主要操作</rl-button>
    <rl-chip checkbox selected>已选择</rl-chip>
  </div>
</div>
```

## Preset API

```html
<rl-theme style-preset="default"></rl-theme>
<rl-theme style-preset="illustration"></rl-theme>
<rl-theme style-preset="ant-illustration"></rl-theme>
```

`ant-illustration` 保留为兼容别名，公开行为等同于 `illustration`。

