---
title: 质量
group: 参考
order: 6
---

# 质量

发布门禁是 `npm run verify`。它会运行单元测试、包构建、custom-elements manifest 生成和浏览器测试。

## 已覆盖契约

| 模块 | 契约 |
| --- | --- |
| 主题 | light、dark、自定义 accent、compact density、reduced motion |
| 风格 preset | default 与 illustration 共用同一套组件源码 |
| 表单 | form-associated input 与 switch 行为 |
| A11y | focus-visible、focus trap、Escape close、键盘 tab |
| i18n | `@lit/localize` runtime mode、本地化路由和 fallback 文案 |

```html live
<div class="doc-live-stack">
  <rl-dialog id="quality-dialog" label="质量对话框">
    焦点管理和浮层 token 是浏览器契约的一部分。
    <rl-button slot="actions" variant="soft">关闭</rl-button>
  </rl-dialog>
  <rl-button onclick="document.querySelector('#quality-dialog').open = true">打开对话框</rl-button>
</div>
```

文档站本身也是测试面的一部分，因此教程示例应该保持小而稳定，并且由 token 驱动。

