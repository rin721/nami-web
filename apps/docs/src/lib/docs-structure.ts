import type { DocsLocale } from './site';

export type DocsSectionId = 'start' | 'theme' | 'resources';
export type DocsEntryKind = 'content' | 'tool';

export interface DocsEntry {
  slug: string;
  kind: DocsEntryKind;
  path: string;
  title: Record<DocsLocale, string>;
  description: Record<DocsLocale, string>;
}

export interface DocsSection {
  id: DocsSectionId;
  path: string;
  title: Record<DocsLocale, string>;
  description: Record<DocsLocale, string>;
  entries: DocsEntry[];
}

export const docsSections = {
  start: {
    id: 'start',
    path: '/docs/getting-started/',
    title: { 'zh-CN': '快速开始', 'en-US': 'Get Started' },
    description: {
      'zh-CN': '从定位、安装、注册方式到框架接入，按真实开始路径阅读。',
      'en-US': 'Read the real starting path: overview, installation, registration, and framework usage.'
    },
    entries: [
      {
        slug: 'overview',
        kind: 'content',
        path: '/docs/overview/',
        title: { 'zh-CN': '总览', 'en-US': 'Overview' },
        description: {
          'zh-CN': '了解 Nami UI 的边界、适用场景和第一批能力。',
          'en-US': 'Understand Nami UI boundaries, fit, and first capabilities.'
        }
      },
      {
        slug: 'getting-started',
        kind: 'content',
        path: '/docs/getting-started/',
        title: { 'zh-CN': '快速开始', 'en-US': 'Getting Started' },
        description: {
          'zh-CN': '安装包、引入主题 CSS，并选择全量注册或单组件导入。',
          'en-US': 'Install packages, include theme CSS, and choose full registration or single-component imports.'
        }
      },
      {
        slug: 'frameworks',
        kind: 'content',
        path: '/docs/frameworks/',
        title: { 'zh-CN': '框架接入', 'en-US': 'Frameworks' },
        description: {
          'zh-CN': '在原生 HTML、Vue、React 和路由钩子里使用 Nami。',
          'en-US': 'Use Nami with native HTML, Vue, React, and route hooks.'
        }
      }
    ]
  },
  theme: {
    id: 'theme',
    path: '/theme/',
    title: { 'zh-CN': '主题', 'en-US': 'Theme' },
    description: {
      'zh-CN': '主题边界、tokens、算法、风格 preset 和主题工具集中在这里。',
      'en-US': 'Theme boundaries, tokens, algorithms, style presets, and theme tools live here.'
    },
    entries: [
      {
        slug: 'overview',
        kind: 'content',
        path: '/theme/',
        title: { 'zh-CN': '主题系统', 'en-US': 'Theme System' },
        description: {
          'zh-CN': '了解 seed 如何驱动明暗模式、密度、动效、圆角、对比度和组件样式。',
          'en-US': 'See how seeds drive color mode, density, motion, radius, contrast, and component styles.'
        }
      },
      {
        slug: 'tokens',
        kind: 'content',
        path: '/theme/tokens/',
        title: { 'zh-CN': 'Tokens', 'en-US': 'Tokens' },
        description: {
          'zh-CN': 'Seed、semantic、component 与 style tokens 的分层边界。',
          'en-US': 'Layered boundaries for seed, semantic, component, and style tokens.'
        }
      },
      {
        slug: 'algorithm',
        kind: 'content',
        path: '/theme/algorithm/',
        title: { 'zh-CN': '主题算法', 'en-US': 'Theme Algorithm' },
        description: {
          'zh-CN': '从 seed 派生 palette，再映射到 semantic/component tokens。',
          'en-US': 'Derive a palette from seeds, then map it to semantic and component tokens.'
        }
      },
      {
        slug: 'style-presets',
        kind: 'content',
        path: '/theme/style-presets/',
        title: { 'zh-CN': '风格预设', 'en-US': 'Style Presets' },
        description: {
          'zh-CN': 'Default 与 Illustration 是两套 token 驱动的视觉语言。',
          'en-US': 'Default and Illustration are token-driven visual languages.'
        }
      },
      {
        slug: 'designer',
        kind: 'tool',
        path: '/theme/designer/',
        title: { 'zh-CN': '主题设计器', 'en-US': 'Theme Designer' },
        description: {
          'zh-CN': '编辑 seed、导入 DTCG、导出 CSS/JSON/TS 并检查受影响组件。',
          'en-US': 'Edit seeds, import DTCG, export CSS/JSON/TS, and inspect affected components.'
        }
      },
      {
        slug: 'lab',
        kind: 'tool',
        path: '/theme/lab/',
        title: { 'zh-CN': '主题矩阵', 'en-US': 'Theme Matrix' },
        description: {
          'zh-CN': '验证主题色、明暗模式、密度、动效和风格 preset 的组合。',
          'en-US': 'Validate accent, color mode, density, motion, and style preset combinations.'
        }
      }
    ]
  },
  resources: {
    id: 'resources',
    path: '/resources/',
    title: { 'zh-CN': '资源', 'en-US': 'Resources' },
    description: {
      'zh-CN': '质量、国际化和语义结构等工程资料集中在这里。',
      'en-US': 'Quality, internationalization, and semantic anatomy resources live here.'
    },
    entries: [
      {
        slug: 'quality',
        kind: 'content',
        path: '/resources/quality/',
        title: { 'zh-CN': '质量基线', 'en-US': 'Quality Baseline' },
        description: {
          'zh-CN': '测试、构建、manifest 和浏览器回归组成发布门禁。',
          'en-US': 'Tests, builds, manifest generation, and browser regressions form the release gate.'
        }
      },
      {
        slug: 'i18n',
        kind: 'content',
        path: '/resources/i18n/',
        title: { 'zh-CN': '国际化', 'en-US': 'i18n' },
        description: {
          'zh-CN': '语言路由、runtime locale 和组件 fallback 文案边界。',
          'en-US': 'Locale routes, runtime locale, and component fallback copy boundaries.'
        }
      },
      {
        slug: 'semantic-anatomy',
        kind: 'content',
        path: '/resources/semantic-anatomy/',
        title: { 'zh-CN': '语义结构', 'en-US': 'Semantic Anatomy' },
        description: {
          'zh-CN': 'CSS Parts、data-state、style hooks 和 metadata 的可解释契约。',
          'en-US': 'Explainable contracts for CSS Parts, data-state, style hooks, and metadata.'
        }
      }
    ]
  }
} as const satisfies Record<DocsSectionId, DocsSection>;

export const primaryDocsSections = [
  docsSections.start,
  docsSections.theme,
  docsSections.resources
] as const;

export function docsSectionEntries(section: DocsSectionId) {
  return docsSections[section].entries;
}

export function docsEntry(section: DocsSectionId, slug: string) {
  return docsSections[section].entries.find((entry) => entry.slug === slug);
}
