import { namiComponentMetadata } from '@nami/ui/metadata';
import { componentSlug, type DocsLocale } from './site';

type LocalizedText = Record<DocsLocale, string>;

export const componentGroups = [
  {
    id: 'actions',
    title: { 'zh-CN': '基础操作', 'en-US': 'Actions' },
    description: {
      'zh-CN': '按钮、图标按钮、徽标、标签与标签栏，用于命令、筛选和轻量状态。',
      'en-US': 'Buttons, icon buttons, badges, chips, and tabs for commands, filters, and lightweight state.'
    },
    names: ['nami-button', 'nami-icon-button', 'nami-badge', 'nami-chip', 'nami-tab-bar']
  },
  {
    id: 'inputs',
    title: { 'zh-CN': '表单输入', 'en-US': 'Form input' },
    description: {
      'zh-CN': '支持表单参与、键盘交互与错误状态的输入组件。',
      'en-US': 'Input controls with form participation, keyboard behavior, and validation states.'
    },
    names: ['nami-input', 'nami-textarea', 'nami-checkbox', 'nami-switch', 'nami-radio-card', 'nami-form-field']
  },
  {
    id: 'feedback',
    title: { 'zh-CN': '反馈与浮层', 'en-US': 'Feedback and overlays' },
    description: {
      'zh-CN': '加载、页面过渡、顶部进度、弹层、抽屉和通知，用于异步反馈与焦点管理。',
      'en-US': 'Loading, page transitions, top progress, dialogs, drawers, and toasts for async feedback and focus management.'
    },
    names: ['nami-spinner', 'nami-skeleton', 'nami-progress', 'nami-alert', 'nami-page-transition', 'nami-top-progress', 'nami-dialog', 'nami-drawer', 'nami-toast']
  },
  {
    id: 'layoutTheme',
    title: { 'zh-CN': '布局与主题', 'en-US': 'Layout and theme' },
    description: {
      'zh-CN': '应用壳、卡片、主题边界与全局配置，支撑跨页面的设计系统结构。',
      'en-US': 'App shell, cards, theme boundaries, and global config for design-system structure.'
    },
    names: ['nami-config', 'nami-theme', 'nami-app-shell', 'nami-container', 'nami-stack', 'nami-cluster', 'nami-grid', 'nami-split', 'nami-card']
  },
  {
    id: 'states',
    title: { 'zh-CN': '状态展示', 'en-US': 'State display' },
    description: {
      'zh-CN': '空状态、结果页和插画组件，用于产品内的状态表达。',
      'en-US': 'Empty states, result states, and illustrations for product feedback surfaces.'
    },
    names: ['nami-illustration', 'nami-empty', 'nami-result']
  }
] as const;

export const componentPreviews = new Map<string, string>([
  ['nami-config', '<nami-config locale="zh-CN"><nami-empty compact></nami-empty></nami-config>'],
  ['nami-theme', '<nami-theme accent="#14b8a6" style-preset="illustration"><nami-button>Scoped theme</nami-button></nami-theme>'],
  ['nami-app-shell', '<div class="mini-shell"><span>Rail</span><strong>App shell</strong><small>Responsive layout slots</small></div>'],
  ['nami-container', '<nami-container size="sm"><nami-card>Token constrained content.</nami-card></nami-container>'],
  ['nami-stack', '<nami-stack gap="sm"><nami-badge>One</nami-badge><nami-badge>Two</nami-badge></nami-stack>'],
  ['nami-cluster', '<nami-cluster gap="sm"><nami-chip>Alpha</nami-chip><nami-chip>Beta</nami-chip><nami-chip>Gamma</nami-chip></nami-cluster>'],
  ['nami-grid', '<nami-grid min="8rem"><nami-card>One</nami-card><nami-card>Two</nami-card></nami-grid>'],
  ['nami-split', '<nami-split min="10rem"><nami-card>Aside</nami-card><nami-card>Main</nami-card></nami-split>'],
  ['nami-card', '<nami-card><nami-badge slot="header" variant="primary">Card</nami-badge><p>Grouped content surface.</p></nami-card>'],
  ['nami-button', '<nami-button>Primary</nami-button><nami-button variant="soft">Soft</nami-button>'],
  ['nami-icon-button', '<nami-icon-button label="Favorite" selected><span slot="icon">F</span></nami-icon-button>'],
  ['nami-badge', '<nami-badge variant="primary">Primary</nami-badge><nami-badge variant="success" tone="solid">Stable</nami-badge>'],
  ['nami-chip', '<nami-chip checkbox selected value="docs">Docs</nami-chip><nami-chip checkbox value="theme">Theme</nami-chip>'],
  ['nami-tab-bar', '<nami-tab-bar value="Overview"><button value="Overview">Overview</button><button value="API">API</button></nami-tab-bar>'],
  ['nami-input', '<nami-input label="Search" placeholder="Try a token name"><span slot="icon">/</span></nami-input>'],
  ['nami-textarea', '<nami-textarea label="Notes" helper-text="Multiline field" rows="3"></nami-textarea>'],
  ['nami-checkbox', '<nami-checkbox checked>Use scoped theme</nami-checkbox>'],
  ['nami-form-field', '<nami-form-field label="Wrapped control" helper-text="Composes with custom elements"><nami-input placeholder="Value"></nami-input></nami-form-field>'],
  ['nami-switch', '<nami-switch checked>Enabled</nami-switch>'],
  ['nami-radio-card', '<nami-radio-card selected label="Token driven" description="Selected state follows accent."></nami-radio-card>'],
  ['nami-spinner', '<nami-spinner size="md" label="Loading"></nami-spinner>'],
  ['nami-skeleton', '<nami-stack gap="sm"><nami-skeleton variant="text"></nami-skeleton><nami-skeleton></nami-skeleton></nami-stack>'],
  ['nami-progress', '<nami-progress value="64" label="Uploading"></nami-progress>'],
  ['nami-alert', '<nami-alert variant="warning" title="Check settings">Review the configuration.</nami-alert>'],
  ['nami-page-transition', '<div class="component-preview-frame"><nami-page-transition active variant="inline" appearance="veil" duration="0"></nami-page-transition></div>'],
  ['nami-top-progress', '<div class="component-preview-frame progress-preview-frame"><nami-top-progress active variant="inline" progress="64" height="12" duration="0"></nami-top-progress></div>'],
  ['nami-dialog', '<nami-button variant="soft">Open dialog</nami-button>'],
  ['nami-drawer', '<nami-button variant="soft">Open drawer</nami-button>'],
  ['nami-toast', '<nami-button variant="soft">Show toast</nami-button>'],
  ['nami-illustration', '<nami-illustration name="search" size="sm"></nami-illustration>'],
  ['nami-empty', '<nami-empty title="No results" description="Try changing filters." compact></nami-empty>'],
  ['nami-result', '<nami-result status="success" title="Ready" sub-title="The component rendered." compact></nami-result>']
]);

const componentUseCases = new Map<string, LocalizedText>([
  ['nami-config', { 'zh-CN': '设置全局语言、方向和本地化运行时。', 'en-US': 'Configure locale, direction, and localization runtime.' }],
  ['nami-theme', { 'zh-CN': '建立主题边界，控制 accent、明暗模式、密度和风格预设。', 'en-US': 'Create a theme boundary for accent, mode, density, and style presets.' }],
  ['nami-app-shell', { 'zh-CN': '构建桌面侧栏与移动底部导航的响应式应用壳。', 'en-US': 'Build a responsive app shell with desktop rail and mobile navigation.' }],
  ['nami-container', { 'zh-CN': '创建有最大宽度和响应式内边距的页面容器。', 'en-US': 'Create width-constrained page containers with responsive gutters.' }],
  ['nami-stack', { 'zh-CN': '用 token 间距组织一维垂直或水平布局。', 'en-US': 'Arrange one-dimensional vertical or horizontal layouts with token spacing.' }],
  ['nami-cluster', { 'zh-CN': '组织会自动换行的操作组、标签组和轻量工具条。', 'en-US': 'Arrange wrapping action groups, chip groups, and lightweight toolbars.' }],
  ['nami-grid', { 'zh-CN': '创建基于最小列宽的响应式网格。', 'en-US': 'Create responsive grids from a minimum column width.' }],
  ['nami-split', { 'zh-CN': '创建可折叠的双栏内容或侧栏布局。', 'en-US': 'Create collapsible two-column content or sidebar layouts.' }],
  ['nami-card', { 'zh-CN': '组织内容区块、示例和产品信息。', 'en-US': 'Group content, examples, and product information.' }],
  ['nami-button', { 'zh-CN': '触发主要操作、次要操作和加载状态。', 'en-US': 'Trigger primary, secondary, and loading actions.' }],
  ['nami-icon-button', { 'zh-CN': '承载工具栏、收藏、关闭等图标命令。', 'en-US': 'Host toolbar, favorite, close, and other icon commands.' }],
  ['nami-badge', { 'zh-CN': '显示状态、版本、分类和元信息。', 'en-US': 'Display status, version, category, and metadata.' }],
  ['nami-chip', { 'zh-CN': '用于筛选、标签选择和轻量布尔状态。', 'en-US': 'Support filters, tag selection, and lightweight boolean state.' }],
  ['nami-tab-bar', { 'zh-CN': '在同级内容区域之间切换，支持 roving tabindex。', 'en-US': 'Switch between peer content areas with roving tabindex.' }],
  ['nami-input', { 'zh-CN': '表单文本输入，支持 helper、error、required 和表单参与。', 'en-US': 'Text input with helper, error, required, and form participation.' }],
  ['nami-textarea', { 'zh-CN': '处理多行文本输入，并保持 helper、error 与表单参与能力。', 'en-US': 'Handle multiline text entry with helper, error, and form participation.' }],
  ['nami-checkbox', { 'zh-CN': '处理布尔选择、必填校验和表单提交值。', 'en-US': 'Handle boolean choices, required validation, and submitted form values.' }],
  ['nami-form-field', { 'zh-CN': '把标签、说明和错误信息组合到任意自定义控件周围。', 'en-US': 'Compose labels, descriptions, and errors around any custom control.' }],
  ['nami-switch', { 'zh-CN': '表示设置项开关，并参与表单提交。', 'en-US': 'Represent settings toggles and participate in forms.' }],
  ['nami-radio-card', { 'zh-CN': '用卡片呈现单选项和配置选择。', 'en-US': 'Present single-choice options and configuration choices as cards.' }],
  ['nami-spinner', { 'zh-CN': '显示局部加载状态。', 'en-US': 'Show local loading state.' }],
  ['nami-skeleton', { 'zh-CN': '在内容加载前显示占位骨架。', 'en-US': 'Show placeholder skeletons before content is ready.' }],
  ['nami-progress', { 'zh-CN': '显示确定或不确定的线性进度。', 'en-US': 'Show determinate or indeterminate linear progress.' }],
  ['nami-alert', { 'zh-CN': '显示信息、成功、警告和危险状态的行内反馈。', 'en-US': 'Show inline feedback for info, success, warning, and danger states.' }],
  ['nami-page-transition', { 'zh-CN': '处理首屏揭幕和阻断式任务过渡。', 'en-US': 'Handle first-paint reveal and blocking task transitions.' }],
  ['nami-top-progress', { 'zh-CN': '在框架路由钩子中显示顶部进度轨道与填充。', 'en-US': 'Show a top progress track and fill from framework route hooks.' }],
  ['nami-dialog', { 'zh-CN': '承载需要焦点管理的模态任务。', 'en-US': 'Host modal tasks that need focus management.' }],
  ['nami-drawer', { 'zh-CN': '在移动端或辅助流程中打开侧向面板。', 'en-US': 'Open side panels for mobile or secondary workflows.' }],
  ['nami-toast', { 'zh-CN': '显示短时反馈和操作结果。', 'en-US': 'Show short feedback and operation results.' }],
  ['nami-illustration', { 'zh-CN': '渲染可随主题变化的状态插画。', 'en-US': 'Render themeable state illustrations.' }],
  ['nami-empty', { 'zh-CN': '表达空列表、无结果和初始状态。', 'en-US': 'Represent empty lists, no results, and initial states.' }],
  ['nami-result', { 'zh-CN': '表达成功、错误、警告和 HTTP 状态页。', 'en-US': 'Represent success, error, warning, and HTTP result states.' }]
]);

export const metadataByName = new Map(namiComponentMetadata.map((item) => [item.name, item]));

export function groupTitle(group: (typeof componentGroups)[number], locale: DocsLocale) {
  return group.title[locale];
}

export function groupDescription(group: (typeof componentGroups)[number], locale: DocsLocale) {
  return group.description[locale];
}

export function componentUseCase(name: string, locale: DocsLocale) {
  return componentUseCases.get(name)?.[locale] ?? metadataByName.get(name)?.summary ?? name;
}

export function componentPath(locale: DocsLocale, name: string) {
  return `/${locale}/components/${componentSlug(name)}/`;
}

export { namiComponentMetadata };
