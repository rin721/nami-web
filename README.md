# Nami UI Labs

Nami UI 是一套基于 Lit + TypeScript 的 Web Components UI 组件库，并配套 Astro 官网文档站。组件库支持默认风格、插画风格、主题算法、i18n、组件 metadata 与跨框架接入。

## 项目结构

- `packages/core`：核心 `nami-*` Web Components，发布包名为 `@nami/ui`。
- `packages/themes`：主题 CSS preset，发布包名为 `@nami/themes`。
- `packages/tokens`：设计 token 与主题算法，发布包名为 `@nami/tokens`。
- `apps/docs`：Astro + MDX 官网文档站，包含首页、组件文档、主题实验室和教程。

## 安装依赖

```bash
npm install
```

## 本地运行官网

```bash
npm run dev
```

默认启动 `apps/docs`，地址为：

```text
http://127.0.0.1:5173/
```

中文首页：

```text
http://127.0.0.1:5173/zh-CN/
```

## 构建与打包

构建全部内容，包括 i18n runtime、组件包、主题包、token 包和官网静态站：

```bash
npm run build
```

只构建组件库相关包：

```bash
npm run build:packages
```

只构建官网：

```bash
npm run build:apps
```

生成 custom elements manifest：

```bash
npm run manifest
```

发布前完整验收：

```bash
npm run verify
```

`verify` 会依次执行：

```bash
npm test
npm run build
npm run manifest
npm run test:browser
```

## 打包产物目录

官网静态文件产物在：

```text
apps/docs/dist/
```

这个目录是 Astro 构建后的静态站输出，可以部署到静态托管服务。

组件库和包产物分别在：

```text
packages/core/dist/
packages/themes/dist/
packages/tokens/dist/
```

其中：

- `packages/core/dist/`：`@nami/ui` 的 JS、类型声明、单组件入口、metadata、anatomy JSON、theme schema。
- `packages/themes/dist/`：`default.css`、`ant-illustration.css` 等主题 CSS。
- `packages/tokens/dist/`：token JS、类型声明、DTCG token JSON 与主题算法入口。

## 测试

运行包级单元测试：

```bash
npm test
```

运行浏览器回归测试：

```bash
npm run test:browser
```

运行全部发布前检查：

```bash
npm run verify
```
