---
title: 主题算法
group: 指南
order: 3.5
---

# 主题算法

Rin UI 的主题是确定性的。少量 seed 会沿着固定路径生成完整 token：

| 层级 | 作用 |
| --- | --- |
| Seed | 用户选择的 accent、模式、圆角、密度、动效、对比度、风格 preset |
| Palette / Map | 派生 accent 色阶和中性色辅助值 |
| Semantic | primary、surface、text、border、focus、overlay 等语义角色 |
| Component | button 背景、chip selected 背景、dialog 阴影等组件钩子 |
| Style | 插画风格的墨线、纸张、描边、涂鸦、偏移阴影等风格身份 |

```html live
<rl-theme accent="#14b8a6" theme="dark" style-preset="illustration" radius="soft" contrast="high">
  <rl-card>
    <rl-badge slot="header" variant="primary">算法派生</rl-badge>
    <rl-button>主要按钮</rl-button>
    <rl-chip checkbox selected value="theme">选中 token</rl-chip>
  </rl-card>
</rl-theme>
```

当工具需要在浏览器外读取同一套契约时，使用 `@rin-labs/tokens/theme`。

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

这套算法是 CSS-first 的。它不调用 AI 服务，只是让设计系统足够清晰，使人和工具都能理解。
