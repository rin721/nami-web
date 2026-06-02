---
title: 框架接入
group: 指南
order: 5
---

# 框架接入

Rin UI 第一版不需要框架 wrapper。使用标准自定义元素注册，并通过 attributes、properties 和 DOM events 传递数据。

## 原生 HTML

```html
<script type="module">
  import '@rin-labs/themes/default.css';
  import '@rin-labs/ui/register';
</script>

<rl-button>保存</rl-button>
```

## Vue

```ts
import '@rin-labs/themes/default.css';
import '@rin-labs/ui/register';
```

在 Vue compiler options 中将 `rl-*` 标签配置为 custom elements。

## React

```tsx
import '@rin-labs/themes/default.css';
import '@rin-labs/ui/register';

export function App() {
  return <rl-button>Save</rl-button>;
}
```

需要类型化 React 事件时，可以通过 refs 监听，或在项目内写一个很小的事件桥接 wrapper。

