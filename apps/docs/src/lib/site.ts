import i18next from 'i18next';

export const docsLocales = ['zh-CN', 'en-US'] as const;
export type DocsLocale = typeof docsLocales[number];

export const defaultLocale: DocsLocale = 'zh-CN';

export function isDocsLocale(value: string | undefined): value is DocsLocale {
  return docsLocales.includes(value as DocsLocale);
}

type MessageKey =
  | 'site.title'
  | 'site.description'
  | 'nav.home'
  | 'nav.docs'
  | 'nav.components'
  | 'nav.tokens'
  | 'nav.lab'
  | 'nav.designer'
  | 'nav.vibe'
  | 'home.eyebrow'
  | 'home.subtitle'
  | 'home.lead'
  | 'home.install'
  | 'home.openDocs'
  | 'home.openDesigner'
  | 'home.vibeTitle'
  | 'home.vibeCopy'
  | 'home.framework'
  | 'home.themeable'
  | 'home.accessible'
  | 'home.metadata'
  | 'controls.theme'
  | 'controls.locale'
  | 'controls.light'
  | 'controls.dark'
  | 'controls.illustration'
  | 'controls.compact'
  | 'controls.reduced'
  | 'controls.highContrast'
  | 'controls.radiusSharp'
  | 'controls.radiusSoft'
  | 'controls.radiusRound'
  | 'controls.blue'
  | 'controls.teal'
  | 'controls.violet'
  | 'component.open'
  | 'component.reference'
  | 'component.preview'
  | 'component.usage'
  | 'component.api'
  | 'component.anatomy'
  | 'component.hooks'
  | 'component.tokens'
  | 'tokens.title'
  | 'tokens.copy'
  | 'lab.title'
  | 'lab.copy'
  | 'designer.title'
  | 'designer.copy'
  | 'designer.seed'
  | 'designer.preview'
  | 'designer.tree'
  | 'designer.css'
  | 'designer.affected'
  | 'notFound.title';

const messages: Record<DocsLocale, Record<MessageKey, string>> = {
  'zh-CN': {
    'site.title': 'Rin UI 官网',
    'site.description': '面向可换肤应用与高效开发的 Web Components UI 组件库。',
    'nav.home': '首页',
    'nav.docs': '文档',
    'nav.components': '组件',
    'nav.tokens': '令牌',
    'nav.lab': '实验室',
    'nav.designer': '设计器',
    'nav.vibe': '工程方法',
    'home.eyebrow': 'Rin UI v1.3',
    'home.subtitle': '面向可换肤应用与高效开发的 Web Components UI 组件库。',
    'home.lead': '官网工程使用成熟的 Astro 内容站技术承载，所有可见界面仍由 Rin UI 自家组件呈现。默认风格、插画风格、主题算法和语义结构都能直接体验。',
    'home.install': '安装',
    'home.openDocs': '快速开始',
    'home.openDesigner': '打开主题设计器',
    'home.vibeTitle': '成熟技术做官网，自家组件做界面',
    'home.vibeCopy': '在官网工程层面使用 Astro、MDX、Content Collections、Shiki、Pagefind 等成熟能力；在可见界面层面坚持使用 Rin UI 自家组件。',
    'home.framework': '跨框架',
    'home.themeable': '可换肤',
    'home.accessible': '可访问',
    'home.metadata': '元数据驱动',
    'controls.theme': '主题控制',
    'controls.locale': '语言',
    'controls.light': '浅色',
    'controls.dark': '深色',
    'controls.illustration': '插画风格',
    'controls.compact': '紧凑密度',
    'controls.reduced': '减少动效',
    'controls.highContrast': '高对比度',
    'controls.radiusSharp': '直角圆角',
    'controls.radiusSoft': '柔和圆角',
    'controls.radiusRound': '圆形圆角',
    'controls.blue': '蓝色',
    'controls.teal': '青绿色',
    'controls.violet': '紫色',
    'component.open': '打开组件参考',
    'component.reference': '组件参考',
    'component.preview': '预览',
    'component.usage': '用法',
    'component.api': 'API',
    'component.anatomy': '语义结构',
    'component.hooks': '样式钩子',
    'component.tokens': '主题令牌',
    'tokens.title': 'Seed、Semantic、Component',
    'tokens.copy': 'Rin UI 将换肤边界放在 CSS 变量和主题算法后面，组件只消费 semantic、component 和 style tokens。',
    'lab.title': '主题实验室',
    'lab.copy': '压力测试默认风格、插画风格、深色模式、主题色、密度和动效。',
    'designer.title': '开放算法，语义输出',
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
    'site.description': 'A Web Components UI library for themeable and efficiently built apps.',
    'nav.home': 'Home',
    'nav.docs': 'Docs',
    'nav.components': 'Components',
    'nav.tokens': 'Tokens',
    'nav.lab': 'Lab',
    'nav.designer': 'Designer',
    'nav.vibe': 'Build method',
    'home.eyebrow': 'Rin UI v1.3',
    'home.subtitle': 'A Web Components UI library for themeable and efficiently built apps.',
    'home.lead': 'The docs site now uses mature Astro content infrastructure, while every visible control, card, preview, and theme surface is still rendered with Rin UI components.',
    'home.install': 'Install',
    'home.openDocs': 'Quick start',
    'home.openDesigner': 'Open designer',
    'home.vibeTitle': 'Mature docs tech, Rin UI surfaces',
    'home.vibeCopy': 'Astro, MDX, Content Collections, Shiki, and Pagefind handle the docs infrastructure; Rin UI owns the visible interface.',
    'home.framework': 'Framework agnostic',
    'home.themeable': 'Themeable',
    'home.accessible': 'Accessible',
    'home.metadata': 'Metadata driven',
    'controls.theme': 'Theme controls',
    'controls.locale': 'Language',
    'controls.light': 'Light',
    'controls.dark': 'Dark',
    'controls.illustration': 'Illustration style',
    'controls.compact': 'Compact density',
    'controls.reduced': 'Reduced motion',
    'controls.highContrast': 'High contrast',
    'controls.radiusSharp': 'Sharp radius',
    'controls.radiusSoft': 'Soft radius',
    'controls.radiusRound': 'Round radius',
    'controls.blue': 'Blue',
    'controls.teal': 'Teal',
    'controls.violet': 'Violet',
    'component.open': 'Open component reference',
    'component.reference': 'Component reference',
    'component.preview': 'Preview',
    'component.usage': 'Usage',
    'component.api': 'API',
    'component.anatomy': 'Semantic anatomy',
    'component.hooks': 'Style hooks',
    'component.tokens': 'Theme tokens',
    'tokens.title': 'Seed, semantic, component',
    'tokens.copy': 'Rin UI keeps theme replacement behind CSS variables and a deterministic algorithm. Components consume semantic, component, and style tokens.',
    'lab.title': 'Theme Lab',
    'lab.copy': 'Stress-test default style, illustration style, dark mode, accent, density, and motion.',
    'designer.title': 'Open algorithm, semantic output',
    'designer.copy': 'Edit seed values, inspect derived tokens, and copy deterministic CSS variables.',
    'designer.seed': 'Seed controls',
    'designer.preview': 'Resolved preview',
    'designer.tree': 'Derived token tree',
    'designer.css': 'Generated CSS',
    'designer.affected': 'Affected components',
    'notFound.title': 'Page not found'
  }
};

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
