import i18next from 'i18next';

export const docsLocales = ['zh-CN', 'en-US'] as const;
export type DocsLocale = (typeof docsLocales)[number];

export const defaultLocale: DocsLocale = 'zh-CN';

export function isDocsLocale(value: string | undefined): value is DocsLocale {
  return docsLocales.includes(value as DocsLocale);
}

const messages = {
  'zh-CN': {
    'site.title': 'Nami UI 官网',
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
    'nav.settings': '设置',
    'home.eyebrow': 'Nami UI v1.6',
    'home.subtitle': '跨框架、可换肤的 Web Components UI 组件库',
    'home.lead': '使用标准 Web Components 构建应用界面。Nami UI 提供默认社区风格、插画风格、开放主题算法和语义化组件结构，适合原生 HTML、Vue、React 与长期维护的设计系统。',
    'home.install': '安装',
    'home.openDocs': '快速开始',
    'home.openDesigner': '打开主题设计器',
    'home.openComponents': '浏览组件',
    'home.vibeTitle': '一套组件源码，多套视觉系统',
    'home.vibeCopy': '默认风格与插画风格共用同一套 nami-* 组件。通过 accent、dark、density、radius、contrast、motion 等 seed 派生完整 token，并通过 CSS Parts 与组件令牌安全定制。',
    'home.framework': '跨框架',
    'home.themeable': '可换肤',
    'home.accessible': '可访问',
    'home.metadata': '元数据驱动',
    'home.libraryTitle': '组件库官网应从真实使用路径开始',
    'home.libraryCopy': '安装、主题、组件、框架接入、质量规范被拆成清晰路由；首页只保留产品定位、核心能力和高价值入口。',
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
    'components.copy': '组件按真实界面任务组织：操作、输入、反馈、布局、主题与状态展示。每个组件都暴露属性、事件、slots、parts 与 token 边界。',
    'components.statsComponents': '公开组件',
    'components.statsComponentsCopy': '具备稳定 metadata 与 package exports 的 custom elements。',
    'components.statsGroups': '任务分组',
    'components.statsGroupsCopy': '按界面任务组织，而不是按内部实现归属组织。',
    'components.statsTokens': 'Token 钩子',
    'components.statsTokensCopy': '组件 metadata 暴露可换肤边界。',
    'tokens.title': 'Seed、Semantic、Component',
    'tokens.copy': 'Nami UI 将换肤边界放在 CSS 变量和确定性主题算法之后。组件只消费 semantic、component 和 style tokens。',
    'theme.title': '主题系统',
    'theme.copy': '从少量 seed 派生完整视觉系统：品牌色、明暗模式、风格预设、密度、圆角、对比度和动效都会同步影响组件。',
    'theme.presetsTitle': '风格预设',
    'theme.presetsCopy': 'Default 与 Illustration 是两套视觉语言，不是两套组件源码。切换 preset 只改变 token 与样式边界。',
    'theme.algorithmTitle': '开放主题算法',
    'theme.algorithmCopy': 'seed 进入派生 palette，再映射到 semantic/component tokens。输出可以复制为 CSS 变量，也能被工具理解。',
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
    'settings.title': '设置',
    'settings.copy': '管理官网外观、页面过渡、语言、阅读偏好与实验性能力。',
    'settings.appearance': '外观',
    'settings.transition': '页面过渡',
    'settings.language': '语言',
    'settings.preferences': '偏好',
    'settings.experimental': '实验性',
    'settings.about': '关于',
    'settings.scheme': '配色模式',
    'settings.palette': '主题色',
    'settings.style': '风格',
    'settings.shape': '形态',
    'settings.firstLoad': '首次进入',
    'settings.routeProgress': '路由进度',
    'settings.barHeight': '进度条高度',
    'settings.progressDuration': '填充动画',
    'settings.preview': '预览',
    'settings.rememberTheme': '保留主题状态',
    'settings.compactDocs': '紧凑文档布局',
    'settings.experimentalCopy': '实验性设置会优先保持可逆与可测试。',
    'settings.aboutCopy': 'Nami UI 是标准 Web Components 组件库，官网使用自家组件展示主题与文档能力。',
    'notFound.title': '页面不存在'
  },
  'en-US': {
    'site.title': 'Nami UI Docs',
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
    'nav.settings': 'Settings',
    'home.eyebrow': 'Nami UI v1.6',
    'home.subtitle': 'A cross-framework, themeable Web Components UI library',
    'home.lead': 'Build application interfaces with standard Web Components. Nami UI ships a neutral default style, an illustration style, an open theme algorithm, and semantic component anatomy for Native HTML, Vue, React, and long-lived design systems.',
    'home.install': 'Install',
    'home.openDocs': 'Get started',
    'home.openDesigner': 'Open designer',
    'home.openComponents': 'Browse components',
    'home.vibeTitle': 'One component source, multiple visual systems',
    'home.vibeCopy': 'Default and illustration styles use the same nami-* components. Accent, dark mode, density, radius, contrast, and motion seeds derive the full token system while CSS Parts and component tokens stay safe to customize.',
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
    'tokens.copy': 'Nami UI keeps theme replacement behind CSS variables and a deterministic algorithm. Components consume semantic, component, and style tokens.',
    'theme.title': 'Theme system',
    'theme.copy': 'A small set of seeds derives the full visual system: accent, color mode, style preset, density, radius, contrast, and motion all update components together.',
    'theme.presetsTitle': 'Style presets',
    'theme.presetsCopy': 'Default and Illustration are two visual languages, not two component implementations. Switching preset changes tokens and style boundaries only.',
    'theme.algorithmTitle': 'Open theme algorithm',
    'theme.algorithmCopy': 'Seeds derive a palette, then semantic and component tokens. The output can be copied as CSS variables and understood by tools.',
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
    'settings.title': 'Settings',
    'settings.copy': 'Manage docs appearance, page transitions, language, reading preferences, and experimental capabilities.',
    'settings.appearance': 'Appearance',
    'settings.transition': 'Page transition',
    'settings.language': 'Language',
    'settings.preferences': 'Preferences',
    'settings.experimental': 'Experimental',
    'settings.about': 'About',
    'settings.scheme': 'Scheme',
    'settings.palette': 'Palette',
    'settings.style': 'Style',
    'settings.shape': 'Shape',
    'settings.firstLoad': 'First load',
    'settings.routeProgress': 'Route progress',
    'settings.barHeight': 'Progress height',
    'settings.progressDuration': 'Fill animation',
    'settings.preview': 'Preview',
    'settings.rememberTheme': 'Remember theme state',
    'settings.compactDocs': 'Compact docs layout',
    'settings.experimentalCopy': 'Experimental settings stay reversible and testable first.',
    'settings.aboutCopy': 'Nami UI is a standards-based Web Components library. The docs site uses its own components to present themes and references.',
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
  return name.replace(/^nami-/, '');
}

export function componentNameFromSlug(slug: string) {
  return slug.startsWith('nami-') ? slug : `nami-${slug}`;
}
