import i18next from 'i18next';

export const docsLocales = ['zh-CN', 'en-US'] as const;
export type DocsLocale = (typeof docsLocales)[number];

export const defaultLocale: DocsLocale = 'zh-CN';

export function isDocsLocale(value: string | undefined): value is DocsLocale {
  return docsLocales.includes(value as DocsLocale);
}

const messages = {
  'zh-CN': {
    'site.title': 'Rin UI 官网',
    'site.description': '跨框架、可换肤的 Web Components UI 组件库。',
    'nav.home': '首页',
    'nav.docs': '开始',
    'nav.getStarted': '快速开始',
    'nav.components': '组件',
    'nav.theme': '主题',
    'nav.tokens': '令牌',
    'nav.playground': '实验室',
    'nav.lab': '主题矩阵',
    'nav.designer': '主题设计器',
    'nav.resources': '资源',
    'nav.vibe': '工程方法',
    'home.eyebrow': 'Rin UI v1.4',
    'home.subtitle': '跨框架、可换肤的 Web Components UI 组件库',
    'home.lead': '用一套标准 Web Components 构建应用界面。Rin UI 提供默认社区风格、插画风格、开放主题算法和语义化组件结构，适合原生 HTML、Vue、React 与长期维护的设计系统。',
    'home.install': '安装',
    'home.openDocs': '快速开始',
    'home.openDesigner': '打开主题设计器',
    'home.openComponents': '浏览组件',
    'home.vibeTitle': '从组件到主题，保持同一套源码',
    'home.vibeCopy': '默认风格与插画风格共用同一批 rl-* 组件。使用 accent、dark、density、radius、contrast 等 seed 即可派生完整 token，并安全覆盖 CSS Parts 与组件令牌。',
    'home.framework': '跨框架',
    'home.themeable': '可换肤',
    'home.accessible': '可访问',
    'home.metadata': '元数据驱动',
    'home.libraryTitle': '一个组件库应当先解决真实使用路径',
    'home.libraryCopy': '安装、主题、组件、框架接入、质量规范被拆成清晰路由；首页只保留产品定位和高价值入口。',
    'home.pathStartCopy': '安装包，选择全量注册或单组件导入，再引入主题 CSS。',
    'home.pathComponentsCopy': '按界面任务浏览组件，并进入详情页查看示例、API、slots、parts 和 tokens。',
    'home.pathThemeCopy': '用同一套 seed 控制主题色、明暗模式、风格预设、密度、圆角、对比度和动效。',
    'controls.theme': '主题控制',
    'controls.locale': '语言',
    'controls.light': '浅色',
    'controls.dark': '深色',
    'controls.illustration': '插画风格',
    'controls.compact': '紧凑密度',
    'controls.reduced': '减少动效',
    'controls.highContrast': '高对比度',
    'controls.radiusSharp': '直角',
    'controls.radiusSoft': '柔和',
    'controls.radiusRound': '圆角',
    'controls.blue': '蓝色',
    'controls.teal': '青绿色',
    'controls.violet': '紫色',
    'component.open': '查看组件',
    'component.reference': '组件参考',
    'component.preview': '预览',
    'component.usage': '用法',
    'component.examples': '示例',
    'component.api': 'API',
    'component.events': '事件',
    'component.slots': 'Slots',
    'component.parts': 'CSS Parts',
    'component.anatomy': '语义结构',
    'component.hooks': '样式钩子',
    'component.tokens': '主题令牌',
    'component.a11y': '可访问性说明',
    'components.title': '组件',
    'components.copy': '按真实界面任务组织组件：操作、输入、反馈、布局、主题与状态展示。每个组件都暴露属性、事件、slots、parts 与 token 边界。',
    'components.statsComponents': '公开组件',
    'components.statsComponentsCopy': '具备稳定 metadata 与 package exports 的 custom elements。',
    'components.statsGroups': '任务分组',
    'components.statsGroupsCopy': '按界面任务组织，而不是按内部实现归属组织。',
    'components.statsTokens': 'Token 钩子',
    'components.statsTokensCopy': '组件 metadata 暴露可换肤边界。',
    'tokens.title': 'Seed、Semantic、Component',
    'tokens.copy': 'Rin UI 将换肤边界放在 CSS 变量和确定性主题算法后面。组件只消费 semantic、component 和 style tokens。',
    'theme.title': '主题系统',
    'theme.copy': '从少量 seed 派生完整视觉系统：品牌色、明暗模式、风格预设、密度、圆角、对比度和动效都能同步影响组件。',
    'theme.presetsTitle': '风格预设',
    'theme.presetsCopy': 'Default 与 Illustration 是两套视觉语言，不是两套组件源码。切换 preset 只改变 token 与样式边界。',
    'theme.algorithmTitle': '开放主题算法',
    'theme.algorithmCopy': 'seed 进入派生 palette，再映射到 semantic/component tokens。输出可以复制为 CSS 变量，也能被工具和 AI 理解。',
    'resources.title': '资源',
    'resources.copy': '质量、i18n、语义结构和工程方法集中放在资源区，避免污染首页主叙事。',
    'lab.title': '主题矩阵',
    'lab.copy': '验证默认风格、插画风格、明暗模式、主题色、密度和动效的组合。',
    'designer.title': '主题设计器',
    'designer.copy': '编辑 seed 值，查看派生 token，并复制确定性的 CSS 变量。',
    'designer.seed': 'Seed 控制',
    'designer.preview': '派生预览',
    'designer.tree': '派生 token 树',
    'designer.css': '生成的 CSS',
    'designer.affected': '受影响组件',
    'notFound.title': '页面不存在'
  },
  'en-US': {
    'site.title': 'Rin UI Docs',
    'site.description': 'A cross-framework, themeable Web Components UI library.',
    'nav.home': 'Home',
    'nav.docs': 'Start',
    'nav.getStarted': 'Get Started',
    'nav.components': 'Components',
    'nav.theme': 'Theme',
    'nav.tokens': 'Tokens',
    'nav.playground': 'Playground',
    'nav.lab': 'Theme Matrix',
    'nav.designer': 'Theme Designer',
    'nav.resources': 'Resources',
    'nav.vibe': 'Build method',
    'home.eyebrow': 'Rin UI v1.4',
    'home.subtitle': 'A cross-framework, themeable Web Components UI library',
    'home.lead': 'Build application interfaces with standard Web Components. Rin UI ships a neutral default style, an illustration style, an open theme algorithm, and semantic component anatomy for Native HTML, Vue, React, and long-lived design systems.',
    'home.install': 'Install',
    'home.openDocs': 'Get started',
    'home.openDesigner': 'Open designer',
    'home.openComponents': 'Browse components',
    'home.vibeTitle': 'One component source, multiple visual systems',
    'home.vibeCopy': 'Default and illustration styles use the same rl-* components. Accent, dark mode, density, radius, contrast, and motion seeds derive the full token system while CSS Parts and component tokens stay safe to customize.',
    'home.framework': 'Framework agnostic',
    'home.themeable': 'Themeable',
    'home.accessible': 'Accessible',
    'home.metadata': 'Metadata driven',
    'home.libraryTitle': 'A component library should start with real user paths',
    'home.libraryCopy': 'Installation, theming, components, framework usage, and quality guidance live in clear routes. The home page focuses on product value and entry points.',
    'home.pathStartCopy': 'Install the package, register all components or import one component at a time, then add a theme stylesheet.',
    'home.pathComponentsCopy': 'Browse components by interface task and open reference pages with examples, API, slots, parts, and tokens.',
    'home.pathThemeCopy': 'Switch accent, light/dark mode, style preset, density, radius, contrast, and motion from the same seed model.',
    'controls.theme': 'Theme controls',
    'controls.locale': 'Language',
    'controls.light': 'Light',
    'controls.dark': 'Dark',
    'controls.illustration': 'Illustration style',
    'controls.compact': 'Compact density',
    'controls.reduced': 'Reduced motion',
    'controls.highContrast': 'High contrast',
    'controls.radiusSharp': 'Sharp',
    'controls.radiusSoft': 'Soft',
    'controls.radiusRound': 'Round',
    'controls.blue': 'Blue',
    'controls.teal': 'Teal',
    'controls.violet': 'Violet',
    'component.open': 'View component',
    'component.reference': 'Component reference',
    'component.preview': 'Preview',
    'component.usage': 'Usage',
    'component.examples': 'Examples',
    'component.api': 'API',
    'component.events': 'Events',
    'component.slots': 'Slots',
    'component.parts': 'CSS Parts',
    'component.anatomy': 'Semantic anatomy',
    'component.hooks': 'Style hooks',
    'component.tokens': 'Theme tokens',
    'component.a11y': 'Accessibility notes',
    'components.title': 'Components',
    'components.copy': 'Components are grouped by real interface tasks: actions, input, feedback, layout, theme, and state display. Each component exposes attributes, events, slots, parts, and token boundaries.',
    'components.statsComponents': 'Components',
    'components.statsComponentsCopy': 'Public custom elements with stable metadata and package exports.',
    'components.statsGroups': 'Task groups',
    'components.statsGroupsCopy': 'Organized by interface jobs instead of implementation ownership.',
    'components.statsTokens': 'Token hooks',
    'components.statsTokensCopy': 'Theme boundaries exposed through component metadata.',
    'tokens.title': 'Seed, Semantic, Component',
    'tokens.copy': 'Rin UI keeps theme replacement behind CSS variables and a deterministic algorithm. Components consume semantic, component, and style tokens.',
    'theme.title': 'Theme system',
    'theme.copy': 'A small set of seeds derives the full visual system: accent, color mode, style preset, density, radius, contrast, and motion all update components together.',
    'theme.presetsTitle': 'Style presets',
    'theme.presetsCopy': 'Default and Illustration are two visual languages, not two component implementations. Switching preset changes tokens and style boundaries only.',
    'theme.algorithmTitle': 'Open theme algorithm',
    'theme.algorithmCopy': 'Seeds derive a palette, then semantic and component tokens. The output can be copied as CSS variables and understood by tools or AI.',
    'resources.title': 'Resources',
    'resources.copy': 'Quality, i18n, semantic anatomy, and build-method guidance live in the resources area instead of crowding the home page.',
    'lab.title': 'Theme Matrix',
    'lab.copy': 'Validate default style, illustration style, dark mode, accent, density, and motion combinations.',
    'designer.title': 'Theme Designer',
    'designer.copy': 'Edit seed values, inspect derived tokens, and copy deterministic CSS variables.',
    'designer.seed': 'Seed controls',
    'designer.preview': 'Resolved preview',
    'designer.tree': 'Derived token tree',
    'designer.css': 'Generated CSS',
    'designer.affected': 'Affected components',
    'notFound.title': 'Page not found'
  }
} as const;

type LocaleMessages = typeof messages;
export type MessageKey = keyof LocaleMessages['en-US'];

const i18n = i18next.createInstance();

void i18n.init({
  lng: defaultLocale,
  fallbackLng: defaultLocale,
  initImmediate: false,
  interpolation: { escapeValue: false },
  resources: Object.fromEntries(
    docsLocales.map((locale) => [locale, { translation: messages[locale] }])
  )
});

export function t(locale: DocsLocale, key: MessageKey) {
  const value = i18n.getFixedT(locale)(key);
  return value === key ? messages[defaultLocale][key] ?? key : value;
}

export function localizedPath(locale: DocsLocale, path = '/') {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  const value = `/${locale}${normalized}`.replace(/\/+$/, '/');
  return value.endsWith('/') ? value : `${value}/`;
}

export function logicalPathFromUrl(pathname: string, locale: DocsLocale) {
  const prefix = `/${locale}`;
  const value = pathname.startsWith(prefix) ? pathname.slice(prefix.length) || '/' : pathname;
  return value.endsWith('/') ? value : `${value}/`;
}

export function switchLocalePath(pathname: string, from: DocsLocale, to: DocsLocale) {
  return localizedPath(to, logicalPathFromUrl(pathname, from));
}

export function componentSlug(name: string) {
  return name.replace(/^rl-/, '');
}

export function componentNameFromSlug(slug: string) {
  return slug.startsWith('rl-') ? slug : `rl-${slug}`;
}
