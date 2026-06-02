import { rlComponentMetadata } from '@rin-labs/ui';
import { componentSlug, type DocsLocale } from './site';

type LocalizedText = Record<DocsLocale, string>;

export const componentGroups = [
  {
    id: 'actions',
    title: { 'zh-CN': '基础操作', 'en-US': 'Actions' },
    description: {
      'zh-CN': '按钮、图标按钮、标签和可选择 chip，用于命令、过滤和轻量状态。',
      'en-US': 'Buttons, icon buttons, badges, and chips for commands, filters, and lightweight state.'
    },
    names: ['rl-button', 'rl-icon-button', 'rl-badge', 'rl-chip', 'rl-tab-bar']
  },
  {
    id: 'inputs',
    title: { 'zh-CN': '表单输入', 'en-US': 'Form input' },
    description: {
      'zh-CN': '支持表单参与、键盘交互和错误状态的输入组件。',
      'en-US': 'Input controls with form participation, keyboard behavior, and validation states.'
    },
    names: ['rl-input', 'rl-switch', 'rl-radio-card']
  },
  {
    id: 'feedback',
    title: { 'zh-CN': '反馈与浮层', 'en-US': 'Feedback and overlays' },
    description: {
      'zh-CN': '加载、弹层、抽屉和通知，用于完成异步反馈与焦点管理。',
      'en-US': 'Loading, dialogs, drawers, and toasts for async feedback and focus management.'
    },
    names: ['rl-spinner', 'rl-dialog', 'rl-drawer', 'rl-toast']
  },
  {
    id: 'layoutTheme',
    title: { 'zh-CN': '布局与主题', 'en-US': 'Layout and theme' },
    description: {
      'zh-CN': '应用壳、卡片、主题边界和全局配置，支撑跨页面的设计系统。',
      'en-US': 'App shell, cards, theme boundaries, and global config for design-system structure.'
    },
    names: ['rl-config', 'rl-theme', 'rl-app-shell', 'rl-card']
  },
  {
    id: 'states',
    title: { 'zh-CN': '状态展示', 'en-US': 'State display' },
    description: {
      'zh-CN': '空状态、结果页和插画组件，用于产品内的状态表达。',
      'en-US': 'Empty states, result states, and illustrations for product feedback surfaces.'
    },
    names: ['rl-illustration', 'rl-empty', 'rl-result']
  }
] as const;

export const componentPreviews = new Map<string, string>([
  ['rl-config', '<rl-config locale="zh-CN"><rl-empty compact></rl-empty></rl-config>'],
  ['rl-theme', '<rl-theme accent="#14b8a6" style-preset="illustration"><rl-button>Scoped theme</rl-button></rl-theme>'],
  ['rl-app-shell', '<div class="mini-shell"><span>Rail</span><strong>App shell</strong><small>Responsive layout slots</small></div>'],
  ['rl-card', '<rl-card><rl-badge slot="header" variant="primary">Card</rl-badge><p>Grouped content surface.</p></rl-card>'],
  ['rl-button', '<rl-button>Primary</rl-button><rl-button variant="soft">Soft</rl-button>'],
  ['rl-icon-button', '<rl-icon-button label="Favorite" selected><span slot="icon">F</span></rl-icon-button>'],
  ['rl-badge', '<rl-badge variant="primary">Primary</rl-badge><rl-badge variant="success" tone="solid">Stable</rl-badge>'],
  ['rl-chip', '<rl-chip checkbox selected value="docs">Docs</rl-chip><rl-chip checkbox value="theme">Theme</rl-chip>'],
  ['rl-tab-bar', '<rl-tab-bar value="Overview"><button value="Overview">Overview</button><button value="API">API</button></rl-tab-bar>'],
  ['rl-input', '<rl-input label="Search" placeholder="Try a token name"><span slot="icon">/</span></rl-input>'],
  ['rl-switch', '<rl-switch checked>Enabled</rl-switch>'],
  ['rl-radio-card', '<rl-radio-card selected label="Token driven" description="Selected state follows accent."></rl-radio-card>'],
  ['rl-spinner', '<rl-spinner size="md" label="Loading"></rl-spinner>'],
  ['rl-dialog', '<rl-button variant="soft">Open dialog</rl-button>'],
  ['rl-drawer', '<rl-button variant="soft">Open drawer</rl-button>'],
  ['rl-toast', '<rl-button variant="soft">Show toast</rl-button>'],
  ['rl-illustration', '<rl-illustration name="search" size="sm"></rl-illustration>'],
  ['rl-empty', '<rl-empty title="No results" description="Try changing filters." compact></rl-empty>'],
  ['rl-result', '<rl-result status="success" title="Ready" sub-title="The component rendered." compact></rl-result>']
]);

const componentUseCases = new Map<string, LocalizedText>([
  ['rl-config', { 'zh-CN': '设置全局语言、方向和本地化运行时。', 'en-US': 'Configure locale, direction, and localization runtime.' }],
  ['rl-theme', { 'zh-CN': '建立主题边界，控制 accent、明暗模式、密度和风格预设。', 'en-US': 'Create a theme boundary for accent, mode, density, and style presets.' }],
  ['rl-app-shell', { 'zh-CN': '构建桌面侧栏与移动底部导航的响应式应用壳。', 'en-US': 'Build a responsive app shell with desktop rail and mobile navigation.' }],
  ['rl-card', { 'zh-CN': '组织内容区块、示例和产品信息。', 'en-US': 'Group content, examples, and product information.' }],
  ['rl-button', { 'zh-CN': '触发主要操作、次要操作和加载状态。', 'en-US': 'Trigger primary, secondary, and loading actions.' }],
  ['rl-icon-button', { 'zh-CN': '承载工具栏、收藏、关闭等图标命令。', 'en-US': 'Host toolbar, favorite, close, and other icon commands.' }],
  ['rl-badge', { 'zh-CN': '显示状态、版本、分类和元信息。', 'en-US': 'Display status, version, category, and metadata.' }],
  ['rl-chip', { 'zh-CN': '用于筛选、标签选择和轻量布尔状态。', 'en-US': 'Support filters, tag selection, and lightweight boolean state.' }],
  ['rl-tab-bar', { 'zh-CN': '在同级内容区域之间切换，支持 roving tabindex。', 'en-US': 'Switch between peer content areas with roving tabindex.' }],
  ['rl-input', { 'zh-CN': '表单文本输入，支持 helper、error、required 和表单参与。', 'en-US': 'Text input with helper, error, required, and form participation.' }],
  ['rl-switch', { 'zh-CN': '表示设置项开关，并参与表单提交。', 'en-US': 'Represent settings toggles and participate in forms.' }],
  ['rl-radio-card', { 'zh-CN': '用卡片呈现单选项和配置选择。', 'en-US': 'Present single-choice options and configuration choices as cards.' }],
  ['rl-spinner', { 'zh-CN': '显示局部加载状态。', 'en-US': 'Show local loading state.' }],
  ['rl-dialog', { 'zh-CN': '承载需要焦点管理的模态任务。', 'en-US': 'Host modal tasks that need focus management.' }],
  ['rl-drawer', { 'zh-CN': '在移动端或辅助流程中打开侧向面板。', 'en-US': 'Open side panels for mobile or secondary workflows.' }],
  ['rl-toast', { 'zh-CN': '显示短时反馈和操作结果。', 'en-US': 'Show short feedback and operation results.' }],
  ['rl-illustration', { 'zh-CN': '渲染可随主题变化的状态插画。', 'en-US': 'Render themeable state illustrations.' }],
  ['rl-empty', { 'zh-CN': '表达空列表、无结果和初始状态。', 'en-US': 'Represent empty lists, no results, and initial states.' }],
  ['rl-result', { 'zh-CN': '表达成功、错误、警告和 HTTP 状态页。', 'en-US': 'Represent success, error, warning, and HTTP result states.' }]
]);

export const metadataByName = new Map(rlComponentMetadata.map((item) => [item.name, item]));

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

export { rlComponentMetadata };
