# Nami UI Labs

Nami UI 是一套基于 Lit + TypeScript 的 Web Components UI 组件库，并配套 Astro 官网文档站。组件库支持默认风格、插画风格、主题算法、i18n、组件 metadata 与跨框架接入。

## 项目结构

- `packages/core`：核心 `nami-*` Web Components，发布包名为 `@nami-web/ui`。
- `packages/themes`：主题 CSS preset，发布包名为 `@nami-web/themes`。
- `packages/tokens`：设计 token 与主题算法，发布包名为 `@nami-web/tokens`。
- `apps/docs`：Astro + MDX 官网文档站，包含首页、组件文档、主题实验室和教程。

## 安装依赖

```bash
npm install
```

## 本地 npm token 与自动发布

项目根目录支持放置本机专用 `.npmrc`，用于本地发布或自动化脚本读取 npm token。`.npmrc` 已在 `.gitignore` 中忽略，不会提交到 GitHub。

```ini
registry=https://registry.npmjs.org/
//registry.npmjs.org/:_authToken=${NPM_TOKEN}
```

GitHub Actions 发布使用仓库 Secret `NPM_TOKEN`，不会读取仓库里的本地 `.npmrc`。发布工作流位于 `.github/workflows/publish-npm.yml`，可手动触发，也会在 `v*` tag 推送时触发。

发布顺序为：

```text
@nami-web/tokens -> @nami-web/themes -> @nami-web/ui
```

包发布到 npm registry 后，npm 与 pnpm 使用同一份 registry 元数据：

```bash
npm install @nami-web/ui @nami-web/themes
pnpm add @nami-web/ui @nami-web/themes
```

## 页面滚动阻尼

`nami-scroll-smoother` 使用 Lenis 提供整页滚动阻力感与惯性缓动，适合官网、文档站和需要顺滑滚动手感的长页面。它不渲染背景特效，只控制文档滚动；`motion="reduced"` 或系统 reduced motion 下会退回原生滚动。

```ts
import '@nami-web/themes/default.css';
import '@nami-web/ui/scroll-smoother';
```

```html
<nami-scroll-smoother preset="balanced" duration="1.2" touch-multiplier="2" anchors stop-inertia-on-navigate></nami-scroll-smoother>
```

```ts
const smoother = document.querySelector('nami-scroll-smoother');

smoother?.applyConfig({
  preset: 'strong',
  duration: 1.6,
  touchMultiplier: 2.4,
  wheelMultiplier: 0.85,
  anchors: { offset: -64 }
});
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

构建静态 CDN 产物：

```bash
npm run build:cdn
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

- `packages/core/dist/`：`@nami-web/ui` 的 JS、类型声明、单组件入口、metadata、anatomy JSON、theme schema。
- `packages/themes/dist/`：`default.css`、`ant-illustration.css` 等主题 CSS。
- `packages/tokens/dist/`：token JS、类型声明、DTCG token JSON 与主题算法入口。

静态 CDN 产物在：

```text
artifacts/cdn/nami-ui/0.1.0/
apps/docs/public/cdn/nami-ui/0.1.0/
```

其中：

- `nami-ui.global.js`：自包含全量组件注册文件，暴露 `window.NamiUI.registerNamiElements`。
- `esm/`：可通过 `type="module"` 引用的 ESM 多文件目录。
- `css/default.css`、`css/ant-illustration.css`、`css/critical.css`：主题 CSS 与首屏 fallback CSS。
- `manifest.json`：版本、文件名与推荐引用路径。

官网构建后会把 `apps/docs/public/cdn/` 复制到静态站根目录，因此当前官网域名下的引用地址为 `https://nami-web.iqwq.com/cdn/nami-ui/0.1.0/`。

普通 HTML 推荐引用：

```html
<link rel="stylesheet" href="https://nami-web.iqwq.com/cdn/nami-ui/0.1.0/css/default.css" />
<script src="https://nami-web.iqwq.com/cdn/nami-ui/0.1.0/nami-ui.global.js"></script>

<nami-button>Hello Nami</nami-button>
```

需要首屏 fallback 时：

```html
<link rel="stylesheet" href="https://nami-web.iqwq.com/cdn/nami-ui/0.1.0/css/critical.css" />
<link rel="stylesheet" href="https://nami-web.iqwq.com/cdn/nami-ui/0.1.0/css/default.css" />
<script src="https://nami-web.iqwq.com/cdn/nami-ui/0.1.0/nami-ui.global.js"></script>
```

ESM 全量注册：

```html
<link rel="stylesheet" href="https://nami-web.iqwq.com/cdn/nami-ui/0.1.0/css/default.css" />
<script type="module" src="https://nami-web.iqwq.com/cdn/nami-ui/0.1.0/esm/register.js"></script>
```

ESM 按需引用：

```html
<link rel="stylesheet" href="https://nami-web.iqwq.com/cdn/nami-ui/0.1.0/css/default.css" />
<script type="module">
  import 'https://nami-web.iqwq.com/cdn/nami-ui/0.1.0/esm/button.js';
  import 'https://nami-web.iqwq.com/cdn/nami-ui/0.1.0/esm/input.js';
</script>
```

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
