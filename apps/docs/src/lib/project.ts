import type { DocsLocale } from './site';

export const projectInfo = {
  name: 'Nami UI',
  version: '0.1.0',
  packageName: '@nami-web/ui',
  themeCss: '@nami-web/themes/default.css',
  repositoryUrl: 'https://github.com/rin721/nami-web',
  repositoryLabel: 'github.com/rin721/nami-web',
  contributors: [
    {
      name: 'rin721',
      url: 'https://github.com/rin721'
    }
  ],
  sponsorsConfigured: false,
  sponsorStatus: {
    'zh-CN': '暂无赞助商配置。',
    'en-US': 'No sponsor configuration yet.'
  } satisfies Record<DocsLocale, string>
} as const;
