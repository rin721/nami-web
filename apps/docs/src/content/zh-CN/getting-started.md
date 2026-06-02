---
title: 快速开始
group: 指南
order: 1
---

# 快速开始

Rin UI 是基于 Lit 的 Web Components 组件库。因为公共能力是标准自定义元素、attributes、events、slots、CSS variables 和 CSS parts，所以可以接入原生 HTML、Vue、React 和其他前端栈。

## 安装

```bash
npm install @rin-labs/ui @rin-labs/themes
```

## 注册全部组件

```html live
<rl-button>主要操作</rl-button>
<rl-button variant="soft">次要操作</rl-button>
<rl-chip checkbox selected value="docs">文档</rl-chip>
```

```ts
import '@rin-labs/themes/default.css';
import '@rin-labs/ui/register';
```

## 只导入一个组件

```ts
import '@rin-labs/themes/default.css';
import '@rin-labs/ui/button';
```

文档站和原型可以使用全量注册入口。应用需要更小依赖面时，使用单组件入口。

