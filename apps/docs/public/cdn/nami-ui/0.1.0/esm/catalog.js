import { namiComponentMetadata as p } from "./metadata.js";
const r = [
  {
    id: "general",
    title: { "zh-CN": "通用", "en-US": "General" },
    description: {
      "zh-CN": "按钮、徽标、卡片与轻量选择控件，用于常见命令、状态和内容容器。",
      "en-US": "Buttons, badges, cards, and lightweight choices for common commands, states, and containers."
    },
    names: ["nami-button", "nami-icon-button", "nami-badge", "nami-chip", "nami-card"]
  },
  {
    id: "layout",
    title: { "zh-CN": "布局", "en-US": "Layout" },
    description: {
      "zh-CN": "应用外壳、容器和布局原语，负责页面结构、间距与响应式组织。",
      "en-US": "Application shell, containers, and layout primitives for page structure, spacing, and responsive flow."
    },
    names: ["nami-app-shell", "nami-container", "nami-stack", "nami-cluster", "nami-grid", "nami-split"]
  },
  {
    id: "navigation",
    title: { "zh-CN": "导航", "en-US": "Navigation" },
    description: {
      "zh-CN": "同级内容切换、路由进度和页面过渡所需的导航反馈。",
      "en-US": "Peer content switching and route feedback for navigation flows."
    },
    names: ["nami-tab-bar", "nami-top-progress", "nami-page-transition"]
  },
  {
    id: "motion",
    title: { "zh-CN": "滚动与动效", "en-US": "Scroll and Motion" },
    description: {
      "zh-CN": "滚动方向感知、视口 reveal 和 hero 舞台氛围，用于页面级视觉反馈与叙事入口。",
      "en-US": "Scroll-aware surfaces, viewport reveal, and hero-stage atmosphere for page-level motion feedback."
    },
    names: ["nami-scroll-header", "nami-scroll-reveal", "nami-hero-stage"]
  },
  {
    id: "data-entry",
    title: { "zh-CN": "数据录入", "en-US": "Data entry" },
    description: {
      "zh-CN": "参与表单提交、验证、键盘操作和错误状态的输入组件。",
      "en-US": "Inputs with form participation, validation, keyboard behavior, and error states."
    },
    names: ["nami-input", "nami-textarea", "nami-checkbox", "nami-switch", "nami-radio-card", "nami-form-field"]
  },
  {
    id: "data-display",
    title: { "zh-CN": "数据展示", "en-US": "Data display" },
    description: {
      "zh-CN": "状态插画、空状态、结果页、骨架屏和线性进度展示。",
      "en-US": "State illustrations, empty states, result pages, skeletons, and linear progress."
    },
    names: ["nami-illustration", "nami-empty", "nami-result", "nami-skeleton", "nami-progress"]
  },
  {
    id: "feedback",
    title: { "zh-CN": "反馈", "en-US": "Feedback" },
    description: {
      "zh-CN": "加载、提醒、弹层、抽屉和通知，用于异步反馈与焦点管理。",
      "en-US": "Loading, alerts, dialogs, drawers, and toasts for async feedback and focus management."
    },
    names: ["nami-spinner", "nami-alert", "nami-dialog", "nami-drawer", "nami-toast"]
  },
  {
    id: "system",
    title: { "zh-CN": "系统", "en-US": "System" },
    description: {
      "zh-CN": "全局语言、方向和主题边界，定义设计系统运行时协议。",
      "en-US": "Global locale, direction, and theme boundaries that define the runtime design-system protocol."
    },
    names: ["nami-config", "nami-theme"]
  }
], l = new Map(p.map((a) => [a.name, a])), y = /* @__PURE__ */ new Map([
  ["nami-config", '<nami-config locale="zh-CN"><nami-empty compact></nami-empty></nami-config>'],
  ["nami-theme", '<nami-theme accent="#14b8a6" style-preset="illustration"><nami-button>Scoped theme</nami-button></nami-theme>'],
  ["nami-app-shell", '<div class="mini-shell"><span>Rail</span><strong>App shell</strong><small>Responsive layout slots</small></div>'],
  ["nami-container", '<nami-container size="sm"><nami-card>Token constrained content.</nami-card></nami-container>'],
  ["nami-stack", '<nami-stack gap="sm"><nami-badge>One</nami-badge><nami-badge>Two</nami-badge></nami-stack>'],
  ["nami-cluster", '<nami-cluster gap="sm"><nami-chip>Alpha</nami-chip><nami-chip>Beta</nami-chip><nami-chip>Gamma</nami-chip></nami-cluster>'],
  ["nami-grid", '<nami-grid min="8rem"><nami-card>One</nami-card><nami-card>Two</nami-card></nami-grid>'],
  ["nami-split", '<nami-split min="10rem"><nami-card>Aside</nami-card><nami-card>Main</nami-card></nami-split>'],
  ["nami-card", '<nami-card><nami-badge slot="header" variant="primary">Card</nami-badge><p>Grouped content surface.</p></nami-card>'],
  ["nami-button", '<nami-button>Primary</nami-button><nami-button variant="soft">Soft</nami-button>'],
  ["nami-icon-button", '<nami-icon-button label="Favorite" selected><span slot="icon">F</span></nami-icon-button>'],
  ["nami-badge", '<nami-badge variant="primary">Primary</nami-badge><nami-badge variant="success" tone="solid">Stable</nami-badge>'],
  ["nami-chip", '<nami-chip checkbox selected value="docs">Docs</nami-chip><nami-chip checkbox value="theme">Theme</nami-chip>'],
  ["nami-tab-bar", '<nami-tab-bar value="Overview"><button value="Overview">Overview</button><button value="API">API</button></nami-tab-bar>'],
  ["nami-input", '<nami-input label="Search" placeholder="Try a token name"><span slot="icon">/</span></nami-input>'],
  ["nami-textarea", '<nami-textarea label="Notes" helper-text="Multiline field" rows="3"></nami-textarea>'],
  ["nami-checkbox", "<nami-checkbox checked>Use scoped theme</nami-checkbox>"],
  ["nami-form-field", '<nami-form-field label="Wrapped control" helper-text="Composes with custom elements"><nami-input placeholder="Value"></nami-input></nami-form-field>'],
  ["nami-switch", "<nami-switch checked>Enabled</nami-switch>"],
  ["nami-radio-card", '<nami-radio-card selected label="Token driven" description="Selected state follows accent."></nami-radio-card>'],
  ["nami-spinner", '<nami-spinner size="md" label="Loading"></nami-spinner>'],
  ["nami-skeleton", '<nami-stack gap="sm"><nami-skeleton variant="text"></nami-skeleton><nami-skeleton></nami-skeleton></nami-stack>'],
  ["nami-progress", '<nami-progress value="64" label="Uploading"></nami-progress>'],
  ["nami-alert", '<nami-alert variant="warning" title="Check settings">Review the configuration.</nami-alert>'],
  ["nami-page-transition", '<div class="component-preview-frame"><nami-page-transition active variant="inline" appearance="veil" duration="0"></nami-page-transition></div>'],
  ["nami-top-progress", '<div class="component-preview-frame progress-preview-frame"><nami-top-progress active variant="inline" progress="64" height="12" duration="0"></nami-top-progress></div>'],
  ["nami-scroll-header", '<nami-scroll-header elevated><nami-cluster gap="sm"><nami-badge variant="primary">Scroll</nami-badge><nami-button variant="soft">Nav</nami-button></nami-cluster></nami-scroll-header>'],
  ["nami-scroll-reveal", '<nami-scroll-reveal revealed effect="fade-up"><nami-card>Viewport reveal</nami-card></nami-scroll-reveal>'],
  ["nami-hero-stage", '<nami-hero-stage height="compact" intensity="soft" style="--nami-hero-stage-compact-height: 132px; --nami-hero-stage-padding: 18px;"><strong>Hero stage</strong></nami-hero-stage>'],
  ["nami-dialog", '<nami-button variant="soft">Open dialog</nami-button>'],
  ["nami-drawer", '<nami-button variant="soft">Open drawer</nami-button>'],
  ["nami-toast", '<nami-button variant="soft">Show toast</nami-button>'],
  ["nami-illustration", '<nami-illustration name="search" size="sm"></nami-illustration>'],
  ["nami-empty", '<nami-empty title="No results" description="Try changing filters." compact></nami-empty>'],
  ["nami-result", '<nami-result status="success" title="Ready" sub-title="The component rendered." compact></nami-result>']
]), f = /* @__PURE__ */ new Map([
  ["nami-config", "配置全局语言、方向和本地化运行时。"],
  ["nami-theme", "建立主题边界，控制 accent、模式、密度、尺寸和风格预设。"],
  ["nami-app-shell", "构建桌面侧栏与移动底部导航的响应式应用外壳。"],
  ["nami-container", "创建有最大宽度和响应式内边距的页面容器。"],
  ["nami-stack", "用 token 间距组织一维垂直或水平布局。"],
  ["nami-cluster", "组织会自动换行的操作组、标签组和轻量工具栏。"],
  ["nami-grid", "创建基于最小列宽的响应式网格。"],
  ["nami-split", "创建可折叠的双栏内容或侧栏布局。"],
  ["nami-card", "组织内容区块、示例和产品信息。"],
  ["nami-button", "触发主要、次要和加载中的操作。"],
  ["nami-icon-button", "承载工具栏、收藏、关闭等图标命令。"],
  ["nami-badge", "显示状态、版本、分类和元信息。"],
  ["nami-chip", "用于筛选、标签选择和轻量布尔状态。"],
  ["nami-tab-bar", "在同级内容区域之间切换，支持 roving tabindex。"],
  ["nami-input", "表单文本输入，支持 helper、error、required 和表单参与。"],
  ["nami-textarea", "处理多行文本输入，并保持 helper、error 与表单参与能力。"],
  ["nami-checkbox", "处理布尔选择、必填校验和表单提交值。"],
  ["nami-form-field", "把标签、说明和错误信息组合到任意自定义控件周围。"],
  ["nami-switch", "表示设置项开关，并参与表单提交。"],
  ["nami-radio-card", "用卡片呈现单选项和配置选择。"],
  ["nami-spinner", "显示局部加载状态。"],
  ["nami-skeleton", "在内容加载前显示占位骨架。"],
  ["nami-progress", "显示确定或不确定的线性进度。"],
  ["nami-alert", "显示信息、成功、警告和危险状态的行内反馈。"],
  ["nami-page-transition", "处理首屏揭幕和阻断式任务过渡。"],
  ["nami-top-progress", "在框架路由钩子中显示顶部进度轨道与填充。"],
  ["nami-scroll-header", "构建会感知滚动方向的 sticky 顶栏，向下隐藏、向上显示，并在滚动后获得毛玻璃层。"],
  ["nami-scroll-reveal", "在内容进入视口时触发 Motion reveal，用于教程、营销区块和文档示例的渐入。"],
  ["nami-hero-stage", "构建 token 驱动的 hero 舞台背景，提供柔光、双光带和主题化内容插槽。"],
  ["nami-dialog", "承载需要焦点管理的模态任务。"],
  ["nami-drawer", "在移动端或辅助流程中打开侧向面板。"],
  ["nami-toast", "显示短时反馈和操作结果。"],
  ["nami-illustration", "渲染可随主题变化的状态插画。"],
  ["nami-empty", "表达空列表、无结果和初始状态。"],
  ["nami-result", "表达成功、错误、警告和 HTTP 状态页。"]
]), C = /* @__PURE__ */ new Map([
  ["nami-config", "Config 全局配置"],
  ["nami-theme", "Theme 主题"],
  ["nami-spinner", "Spinner 加载"],
  ["nami-page-transition", "PageTransition 页面过渡"],
  ["nami-top-progress", "TopProgress 顶部进度"],
  ["nami-scroll-header", "ScrollHeader 滚动头部"],
  ["nami-scroll-reveal", "ScrollReveal 视口显现"],
  ["nami-hero-stage", "HeroStage 舞台背景"],
  ["nami-illustration", "Illustration 插画"],
  ["nami-empty", "Empty 空状态"],
  ["nami-result", "Result 结果页"],
  ["nami-card", "Card 卡片"],
  ["nami-badge", "Badge 徽标"],
  ["nami-button", "Button 按钮"],
  ["nami-icon-button", "IconButton 图标按钮"],
  ["nami-chip", "Chip 标签"],
  ["nami-input", "Input 输入框"],
  ["nami-switch", "Switch 开关"],
  ["nami-radio-card", "RadioCard 单选卡片"],
  ["nami-tab-bar", "TabBar 标签栏"],
  ["nami-dialog", "Dialog 对话框"],
  ["nami-drawer", "Drawer 抽屉"],
  ["nami-toast", "Toast 通知"],
  ["nami-app-shell", "AppShell 应用外壳"],
  ["nami-container", "Container 容器"],
  ["nami-stack", "Stack 堆叠"],
  ["nami-cluster", "Cluster 簇布局"],
  ["nami-grid", "Grid 网格"],
  ["nami-split", "Split 分栏"],
  ["nami-checkbox", "Checkbox 复选框"],
  ["nami-textarea", "Textarea 文本域"],
  ["nami-form-field", "FormField 表单项"],
  ["nami-alert", "Alert 警告提示"],
  ["nami-skeleton", "Skeleton 骨架屏"],
  ["nami-progress", "Progress 进度条"]
]), w = [
  {
    name: "nami-radio-group",
    groupId: "data-entry",
    status: "planned",
    displayName: { "zh-CN": "RadioGroup 单选组", "en-US": "RadioGroup" },
    useCase: { "zh-CN": "组织互斥选择项，并提供键盘导航和表单值。", "en-US": "Groups mutually exclusive choices with keyboard navigation and form value." },
    priority: 60,
    keywords: ["radio", "group", "single choice", "单选组", "表单"],
    preview: '<nami-empty compact title="Planned" description="Radio group"></nami-empty>'
  },
  {
    name: "nami-select",
    groupId: "data-entry",
    status: "planned",
    displayName: { "zh-CN": "Select 选择器", "en-US": "Select" },
    useCase: { "zh-CN": "从有限选项中选择一个或多个值。", "en-US": "Selects one or more values from a constrained option set." },
    priority: 61,
    keywords: ["select", "combobox", "选择器", "下拉", "表单"],
    preview: '<nami-empty compact title="Planned" description="Select"></nami-empty>'
  },
  {
    name: "nami-listbox",
    groupId: "data-entry",
    status: "planned",
    displayName: { "zh-CN": "Listbox 列表框", "en-US": "Listbox" },
    useCase: { "zh-CN": "展示可键盘选择的选项列表。", "en-US": "Presents a keyboard-selectable list of options." },
    priority: 62,
    keywords: ["listbox", "option", "列表框", "选项"],
    preview: '<nami-empty compact title="Planned" description="Listbox"></nami-empty>'
  },
  {
    name: "nami-tooltip",
    groupId: "feedback",
    status: "planned",
    displayName: { "zh-CN": "Tooltip 文字提示", "en-US": "Tooltip" },
    useCase: { "zh-CN": "为图标按钮和紧凑控件提供短提示。", "en-US": "Adds short hints for icon buttons and compact controls." },
    priority: 60,
    keywords: ["tooltip", "hint", "文字提示", "悬浮"],
    preview: '<nami-empty compact title="Planned" description="Tooltip"></nami-empty>'
  },
  {
    name: "nami-popover",
    groupId: "feedback",
    status: "planned",
    displayName: { "zh-CN": "Popover 弹出框", "en-US": "Popover" },
    useCase: { "zh-CN": "承载轻量说明、筛选器或局部操作。", "en-US": "Hosts lightweight explanations, filters, or local actions." },
    priority: 61,
    keywords: ["popover", "overlay", "弹出框", "浮层"],
    preview: '<nami-empty compact title="Planned" description="Popover"></nami-empty>'
  },
  {
    name: "nami-menu",
    groupId: "navigation",
    status: "planned",
    displayName: { "zh-CN": "Menu 菜单", "en-US": "Menu" },
    useCase: { "zh-CN": "展示命令、导航或上下文操作列表。", "en-US": "Lists commands, navigation items, or contextual actions." },
    priority: 60,
    keywords: ["menu", "command", "菜单", "导航"],
    preview: '<nami-empty compact title="Planned" description="Menu"></nami-empty>'
  },
  {
    name: "nami-dropdown",
    groupId: "navigation",
    status: "planned",
    displayName: { "zh-CN": "Dropdown 下拉菜单", "en-US": "Dropdown" },
    useCase: { "zh-CN": "把触发器与菜单或浮层内容组合起来。", "en-US": "Combines a trigger with menu or floating content." },
    priority: 61,
    keywords: ["dropdown", "menu", "下拉菜单", "触发器"],
    preview: '<nami-empty compact title="Planned" description="Dropdown"></nami-empty>'
  },
  {
    name: "nami-accordion",
    groupId: "data-display",
    status: "planned",
    displayName: { "zh-CN": "Accordion 折叠面板", "en-US": "Accordion" },
    useCase: { "zh-CN": "在有限空间中展开或收起内容段落。", "en-US": "Expands and collapses content sections in limited space." },
    priority: 60,
    keywords: ["accordion", "collapse", "折叠面板"],
    preview: '<nami-empty compact title="Planned" description="Accordion"></nami-empty>'
  },
  {
    name: "nami-breadcrumb",
    groupId: "navigation",
    status: "planned",
    displayName: { "zh-CN": "Breadcrumb 面包屑", "en-US": "Breadcrumb" },
    useCase: { "zh-CN": "展示当前页面在信息架构中的层级路径。", "en-US": "Shows the current page location in the information hierarchy." },
    priority: 62,
    keywords: ["breadcrumb", "path", "面包屑", "导航"],
    preview: '<nami-empty compact title="Planned" description="Breadcrumb"></nami-empty>'
  },
  {
    name: "nami-pagination",
    groupId: "navigation",
    status: "planned",
    displayName: { "zh-CN": "Pagination 分页", "en-US": "Pagination" },
    useCase: { "zh-CN": "在大列表或表格中切换页码。", "en-US": "Moves through pages in long lists or tables." },
    priority: 63,
    keywords: ["pagination", "page", "分页", "列表"],
    preview: '<nami-empty compact title="Planned" description="Pagination"></nami-empty>'
  },
  {
    name: "nami-table",
    groupId: "data-display",
    status: "planned",
    displayName: { "zh-CN": "Table 表格", "en-US": "Table" },
    useCase: { "zh-CN": "展示可扫描、可比较的结构化数据。", "en-US": "Displays structured data for scanning and comparison." },
    priority: 61,
    keywords: ["table", "data grid", "表格", "数据展示"],
    preview: '<nami-empty compact title="Planned" description="Table"></nami-empty>'
  },
  {
    name: "nami-avatar",
    groupId: "data-display",
    status: "planned",
    displayName: { "zh-CN": "Avatar 头像", "en-US": "Avatar" },
    useCase: { "zh-CN": "展示用户、团队或实体的视觉标识。", "en-US": "Represents users, teams, or entities visually." },
    priority: 62,
    keywords: ["avatar", "user", "头像", "用户"],
    preview: '<nami-empty compact title="Planned" description="Avatar"></nami-empty>'
  },
  {
    name: "nami-divider",
    groupId: "layout",
    status: "planned",
    displayName: { "zh-CN": "Divider 分割线", "en-US": "Divider" },
    useCase: { "zh-CN": "分隔内容组或操作组，维持页面扫描节奏。", "en-US": "Separates content or action groups while preserving scan rhythm." },
    priority: 60,
    keywords: ["divider", "separator", "分割线", "布局"],
    preview: '<nami-empty compact title="Planned" description="Divider"></nami-empty>'
  },
  {
    name: "nami-steps",
    groupId: "navigation",
    status: "planned",
    displayName: { "zh-CN": "Steps 步骤条", "en-US": "Steps" },
    useCase: { "zh-CN": "表达多步骤流程中的当前位置和完成状态。", "en-US": "Shows current position and completion state in multi-step flows." },
    priority: 64,
    keywords: ["steps", "wizard", "步骤条", "流程"],
    preview: '<nami-empty compact title="Planned" description="Steps"></nami-empty>'
  }
], k = /* @__PURE__ */ new Map([
  ["nami-button", '<nami-cluster gap="sm"><nami-button size="lg" loading>Saving</nami-button><nami-button variant="outline">Cancel</nami-button></nami-cluster>'],
  ["nami-theme", '<nami-theme theme="dark" size="lg" accent="#f97316" radius="soft"><nami-button>Large scoped action</nami-button></nami-theme>'],
  ["nami-input", '<nami-input label="Email" type="email" required error="Use a valid address"></nami-input>'],
  ["nami-textarea", '<nami-textarea label="Release notes" helper-text="Keep it concise" rows="5"></nami-textarea>'],
  ["nami-checkbox", '<nami-checkbox name="terms" required checked>Accept terms</nami-checkbox>'],
  ["nami-form-field", '<nami-form-field label="Custom field" helper-text="Works with slotted controls"><nami-switch checked>Enabled</nami-switch></nami-form-field>'],
  ["nami-radio-card", '<nami-stack gap="sm"><nami-radio-card selected label="Comfortable" description="Default density"></nami-radio-card><nami-radio-card label="Compact" description="Dense product UI"></nami-radio-card></nami-stack>'],
  ["nami-tab-bar", '<nami-tab-bar value="Tokens" orientation="horizontal"><button value="Overview">Overview</button><button value="Tokens">Tokens</button><button value="API">API</button></nami-tab-bar>'],
  ["nami-alert", '<nami-alert variant="danger" title="Token contract changed" closable>Review affected component overrides.</nami-alert>'],
  ["nami-dialog", '<nami-dialog open label="Confirm"><p>Review the operation before continuing.</p><nami-button slot="actions">Confirm</nami-button></nami-dialog>'],
  ["nami-drawer", '<nami-drawer open placement="right"><h3 slot="label">Filters</h3><nami-checkbox checked>Only active</nami-checkbox></nami-drawer>'],
  ["nami-toast", 'NamiToast.show({ message: "Saved", variant: "success", duration: 2400 })'],
  ["nami-app-shell", '<nami-app-shell rail-width="64" mobile-bar-height="60" sticky safe-area><nav slot="rail">Nav</nav><main>Content</main></nami-app-shell>'],
  ["nami-scroll-header", '<nami-scroll-header threshold="20" hide-threshold="56"><nami-cluster gap="sm"><nami-badge variant="primary">Docs</nami-badge><a href="#">Overview</a><a href="#">API</a></nami-cluster></nami-scroll-header>'],
  ["nami-scroll-reveal", '<nami-scroll-reveal effect="line-expand" amount="0.4"><nami-card>Line expansion reveal</nami-card></nami-scroll-reveal>'],
  ["nami-hero-stage", '<nami-hero-stage variant="beam" height="compact" intensity="normal"><nami-stack><h2>Motion-aware stage</h2><nami-button>Explore</nami-button></nami-stack></nami-hero-stage>'],
  ["nami-grid", '<nami-grid min="12rem" gap="lg"><nami-card>Metric</nami-card><nami-card>Trend</nami-card><nami-card>Task</nami-card></nami-grid>'],
  ["nami-split", '<nami-split ratio="sidebar-main" min="16rem"><aside>Filters</aside><main>Results</main></nami-split>'],
  ["nami-empty", '<nami-empty title="No projects" description="Create the first project to continue"><nami-button slot="actions">Create</nami-button></nami-empty>'],
  ["nami-result", '<nami-result status="error" title="Payment failed" sub-title="The card could not be charged"><nami-button slot="actions">Retry</nami-button></nami-result>'],
  ["nami-progress", '<nami-progress indeterminate label="Syncing"></nami-progress>'],
  ["nami-skeleton", '<nami-stack gap="sm"><nami-skeleton variant="avatar"></nami-skeleton><nami-skeleton variant="text"></nami-skeleton><nami-skeleton variant="text"></nami-skeleton></nami-stack>']
]);
function d(a, e) {
  return a.replace(/^nami-/, ""), e === "basic" ? { "zh-CN": "基础示例", "en-US": "Basic example" } : { "zh-CN": "进阶示例", "en-US": "Advanced example" };
}
function u(a) {
  return a === "basic" ? {
    "zh-CN": "展示组件最常见的使用方式。",
    "en-US": "Shows the most common way to use the component."
  } : {
    "zh-CN": "展示状态、组合或主题边界下的更完整用法。",
    "en-US": "Shows a fuller composition with state, slots, or theme boundaries."
  };
}
function S(a, e) {
  const n = a.replace(/^nami-/, "").replace(/-/g, "");
  return {
    html: e,
    vue: `<template>
  ${e}
</template>`,
    react: `export function ${n[0]?.toUpperCase() ?? "N"}${n.slice(1)}Example() {
  return <div dangerouslySetInnerHTML={{ __html: ${JSON.stringify(e)} }} />;
}`
  };
}
function s(a) {
  return a.replace(/^nami-/, "").split("-").map((e) => e[0]?.toUpperCase() + e.slice(1)).join("");
}
function N(a) {
  return r.find((e) => e.names.includes(a))?.id ?? "system";
}
function P(a) {
  return a.replace(/^nami-/, "");
}
function T(a) {
  return `nami-${a}`;
}
function A(a, e) {
  return a.title[e];
}
function D(a, e) {
  return a.description[e];
}
function m(a, e) {
  return e === "zh-CN" ? C.get(a) ?? s(a) : s(a);
}
function o(a, e) {
  const n = l.get(a);
  return e === "zh-CN" ? f.get(a) ?? n?.summary ?? a : n?.summary ?? a;
}
function c(a) {
  return y.get(a) ?? l.get(a)?.usage ?? "";
}
function z(a) {
  return {
    title: d(a, "basic"),
    description: u("basic"),
    code: l.get(a)?.usage ?? c(a)
  };
}
function x(a) {
  return {
    title: d(a, "advanced"),
    description: u("advanced"),
    code: k.get(a) ?? c(a)
  };
}
function M(a, e) {
  return h(a).frameworks[e];
}
function h(a) {
  const e = z(a), n = x(a), t = N(a), i = r.find((v) => v.id === t)?.names.indexOf(a) ?? 0;
  return {
    name: a,
    groupId: t,
    status: "available",
    displayName: {
      "zh-CN": m(a, "zh-CN"),
      "en-US": m(a, "en-US")
    },
    preview: c(a),
    useCase: {
      "zh-CN": o(a, "zh-CN"),
      "en-US": o(a, "en-US")
    },
    priority: i,
    keywords: [a, s(a), m(a, "zh-CN"), o(a, "zh-CN"), o(a, "en-US")],
    basic: e,
    advanced: n,
    frameworks: S(a, e.code)
  };
}
const g = p.map((a) => h(a.name)), U = w, b = [
  ...g,
  ...U
].sort((a, e) => {
  if (a.groupId !== e.groupId) {
    const n = r.findIndex((i) => i.id === a.groupId), t = r.findIndex((i) => i.id === e.groupId);
    return n - t;
  }
  return a.priority - e.priority;
}), R = new Map(g.map((a) => [a.name, a]));
function E(a) {
  return b.filter((e) => e.groupId === a).sort((e, n) => e.priority - n.priority);
}
function G(a) {
  return b.find((e) => e.name === a)?.status;
}
export {
  x as componentAdvancedExample,
  G as componentAvailability,
  z as componentBasicExample,
  h as componentCatalogEntry,
  E as componentCatalogItemsForGroup,
  m as componentDisplayName,
  M as componentFrameworkExample,
  D as componentGroupDescription,
  A as componentGroupTitle,
  T as componentNameFromSlug,
  c as componentPreview,
  P as componentSlug,
  o as componentUseCase,
  g as namiComponentCatalog,
  r as namiComponentCatalogGroups,
  b as namiComponentCatalogItems,
  R as namiComponentExamples,
  y as namiComponentPreviews,
  l as namiMetadataByName,
  U as namiPlannedComponentCatalog
};
