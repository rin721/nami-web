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
      'zh-CN': '从项目定位、安装、注册方式到框架接入，按第一次接入组件库的真实路径组织。',
      'en-US': 'A first-use path from positioning and installation to registration and framework integration.'
    },
    entries: [
      {
        slug: 'overview',
        kind: 'content',
        path: '/docs/overview/',
        title: { 'zh-CN': '总览', 'en-US': 'Overview' },
        description: {
          'zh-CN': '了解 Nami UI 的设计目标、适用场景、包结构和文档阅读路径。',
          'en-US': 'Understand Nami UI goals, fit, package structure, and documentation paths.'
        }
      },
      {
        slug: 'getting-started',
        kind: 'content',
        path: '/docs/getting-started/',
        title: { 'zh-CN': '安装与使用', 'en-US': 'Install and Use' },
        description: {
          'zh-CN': '安装包、加载主题 CSS、注册组件，并运行第一个可交互示例。',
          'en-US': 'Install packages, load theme CSS, register components, and run the first interactive example.'
        }
      },
      {
        slug: 'frameworks',
        kind: 'content',
        path: '/docs/frameworks/',
        title: { 'zh-CN': '框架接入', 'en-US': 'Frameworks' },
        description: {
          'zh-CN': '在原生 HTML、Vue、React、Astro 和路由钩子里使用 Nami UI。',
          'en-US': 'Use Nami UI with native HTML, Vue, React, Astro, and route hooks.'
        }
      }
    ]
  },
  theme: {
    id: 'theme',
    path: '/theme/',
    title: { 'zh-CN': '主题', 'en-US': 'Theme' },
    description: {
      'zh-CN': '主题边界、token 分层、派生算法、风格预设和主题工具集中在这里。',
      'en-US': 'Theme boundaries, token layers, derivation algorithms, style presets, and theme tools live here.'
    },
    entries: [
      {
        slug: 'overview',
        kind: 'content',
        path: '/theme/',
        title: { 'zh-CN': '主题系统', 'en-US': 'Theme System' },
        description: {
          'zh-CN': '从 seed 到 CSS variables，理解 Nami 的运行时主题协议。',
          'en-US': 'Understand the runtime theme protocol from seeds to CSS variables.'
        }
      },
      {
        slug: 'tokens',
        kind: 'content',
        path: '/theme/tokens/',
        title: { 'zh-CN': 'Tokens', 'en-US': 'Tokens' },
        description: {
          'zh-CN': '理解 seed、semantic、component 与 style tokens 的责任边界。',
          'en-US': 'Understand the responsibilities of seed, semantic, component, and style tokens.'
        }
      },
      {
        slug: 'algorithm',
        kind: 'content',
        path: '/theme/algorithm/',
        title: { 'zh-CN': '主题算法', 'en-US': 'Theme Algorithm' },
        description: {
          'zh-CN': '从少量 seed 派生 palette、semantic tokens、component tokens 和导出产物。',
          'en-US': 'Derive palettes, semantic tokens, component tokens, and exports from a small seed set.'
        }
      },
      {
        slug: 'style-presets',
        kind: 'content',
        path: '/theme/style-presets/',
        title: { 'zh-CN': '风格预设', 'en-US': 'Style Presets' },
        description: {
          'zh-CN': '用同一套组件源码切换默认风格和插画风格。',
          'en-US': 'Switch default and illustration styles with the same component implementation.'
        }
      },
      {
        slug: 'designer',
        kind: 'tool',
        path: '/theme/designer/',
        title: { 'zh-CN': '主题设计器', 'en-US': 'Theme Designer' },
        description: {
          'zh-CN': '编辑 seed、导入 DTCG、导出 CSS/JSON/TS，并检查受影响组件。',
          'en-US': 'Edit seeds, import DTCG, export CSS/JSON/TS, and inspect affected components.'
        }
      },
      {
        slug: 'lab',
        kind: 'tool',
        path: '/theme/lab/',
        title: { 'zh-CN': '主题矩阵', 'en-US': 'Theme Matrix' },
        description: {
          'zh-CN': '验证明暗模式、密度、尺寸、动效、对比度和风格预设组合。',
          'en-US': 'Validate color mode, density, size, motion, contrast, and style preset combinations.'
        }
      }
    ]
  },
  resources: {
    id: 'resources',
    path: '/resources/',
    title: { 'zh-CN': '资源', 'en-US': 'Resources' },
    description: {
      'zh-CN': '设计规范、质量基线、国际化、语义结构、更新日志和 FAQ 的工程参考。',
      'en-US': 'Engineering references for design, quality, i18n, semantic anatomy, changelog, and FAQ.'
    },
    entries: [
      {
        slug: 'design',
        kind: 'content',
        path: '/resources/design/',
        title: { 'zh-CN': '设计规范', 'en-US': 'Design' },
        description: {
          'zh-CN': '颜色、排版、阴影、圆角、密度和交互动效的视觉原则。',
          'en-US': 'Visual guidance for color, typography, shadow, radius, density, and motion.'
        }
      },
      {
        slug: 'quality',
        kind: 'content',
        path: '/resources/quality/',
        title: { 'zh-CN': '质量基线', 'en-US': 'Quality Baseline' },
        description: {
          'zh-CN': '测试、构建、manifest、浏览器回归和发布前检查。',
          'en-US': 'Tests, builds, manifest generation, browser regressions, and release checks.'
        }
      },
      {
        slug: 'i18n',
        kind: 'content',
        path: '/resources/i18n/',
        title: { 'zh-CN': '国际化', 'en-US': 'i18n' },
        description: {
          'zh-CN': '语言路由、runtime locale、fallback 文案和双语内容同步。',
          'en-US': 'Locale routes, runtime locale, fallback copy, and bilingual content parity.'
        }
      },
      {
        slug: 'semantic-anatomy',
        kind: 'content',
        path: '/resources/semantic-anatomy/',
        title: { 'zh-CN': '语义结构', 'en-US': 'Semantic Anatomy' },
        description: {
          'zh-CN': 'CSS Parts、状态钩子、metadata 和可解释样式契约。',
          'en-US': 'CSS Parts, state hooks, metadata, and explainable styling contracts.'
        }
      },
      {
        slug: 'changelog',
        kind: 'content',
        path: '/resources/changelog/',
        title: { 'zh-CN': '更新日志', 'en-US': 'Changelog' },
        description: {
          'zh-CN': '版本号、发布日期、重要新增、破坏性变更和修复记录。',
          'en-US': 'Version, release date, additions, breaking changes, and fixes.'
        }
      },
      {
        slug: 'faq',
        kind: 'content',
        path: '/resources/faq/',
        title: { 'zh-CN': 'FAQ', 'en-US': 'FAQ' },
        description: {
          'zh-CN': '设计资源、常见报错、生态链接和未提供能力的真实状态。',
          'en-US': 'Design resources, common errors, ecosystem links, and honest unavailable states.'
        }
      }
    ]
  }
} as const satisfies Record<DocsSectionId, DocsSection>;

export const primaryDocsSections = [docsSections.start, docsSections.theme, docsSections.resources] as const;

export function docsSectionEntries(section: DocsSectionId) {
  return docsSections[section].entries;
}

export function docsEntry(section: DocsSectionId, slug: string) {
  return docsSections[section].entries.find((entry) => entry.slug === slug);
}

export function adjacentDocsEntries(section: DocsSectionId, slug: string) {
  const entries = docsSections[section].entries;
  const index = entries.findIndex((entry) => entry.slug === slug);
  return {
    previous: index > 0 ? entries[index - 1] : undefined,
    next: index >= 0 && index < entries.length - 1 ? entries[index + 1] : undefined
  };
}
