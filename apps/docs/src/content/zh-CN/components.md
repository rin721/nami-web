---
title: 组件
group: 参考
order: 4
---

# 组件

组件 API 由组件库 metadata 生成。每个组件都会声明 attributes、properties、events、slots、CSS parts 和 token hooks。

```html live
<div class="doc-live-stack">
  <rl-tab-bar value="Overview">
    <button value="Overview">总览</button>
    <button value="Tokens">令牌</button>
    <button value="Motion">动效</button>
  </rl-tab-bar>
  <rl-radio-card selected label="Token 驱动" description="选中状态跟随当前主题色。"></rl-radio-card>
  <rl-empty title="没有结果" description="试试调整筛选条件。">
    <rl-button slot="actions" variant="soft">新建项目</rl-button>
  </rl-empty>
</div>
```

## 定制边界

使用 slots 放置内容，使用 CSS parts 定制内部样式边界，使用 CSS variables 做主题级定制。

