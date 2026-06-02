import { marked } from 'marked';

export interface DocPage {
  locale: string;
  slug: string;
  title: string;
  group: string;
  order: number;
  markdown: string;
}

const rawDocs = import.meta.glob('./content/*/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;

function localeFromPath(path: string) {
  const parts = path.split('/');
  return parts[2] ?? 'en-US';
}

function slugFromPath(path: string) {
  return path.split('/').pop()?.replace(/\.md$/, '') ?? path;
}

function parseDocPage(path: string, source: string): DocPage {
  const frontmatter = source.match(/^---\n([\s\S]*?)\n---\n?/);
  const meta = new Map<string, string>();
  let markdown = source;

  if (frontmatter) {
    markdown = source.slice(frontmatter[0].length);
    frontmatter[1].split('\n').forEach((line) => {
      const [key, ...rest] = line.split(':');
      if (key && rest.length > 0) meta.set(key.trim(), rest.join(':').trim());
    });
  }

  const slug = slugFromPath(path);
  return {
    locale: localeFromPath(path),
    slug,
    title: meta.get('title') ?? slug,
    group: meta.get('group') ?? 'Guide',
    order: Number(meta.get('order') ?? 999),
    markdown
  };
}

function escapeAttribute(value: string) {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

const renderer = new marked.Renderer();

renderer.code = ({ text, lang }) => {
  const info = (lang ?? '').trim();
  const [language, ...flags] = info.split(/\s+/);
  const encoded = escapeAttribute(encodeURIComponent(text));
  const languageAttr = escapeAttribute(language || '');

  if (language === 'html' && flags.includes('live')) {
    return `<rin-docs-live-demo data-code="${encoded}"></rin-docs-live-demo>`;
  }

  return `<rin-docs-code-block data-language="${languageAttr}" data-code="${encoded}"></rin-docs-code-block>`;
};

export const docs = Object.entries(rawDocs)
  .map(([path, source]) => parseDocPage(path, source))
  .sort((a, b) => a.order - b.order);

export function docsForLocale(locale: string) {
  return docs.filter((doc) => doc.locale === locale).sort((a, b) => a.order - b.order);
}

export function docBySlug(locale: string, slug: string) {
  return docs.find((doc) => doc.locale === locale && doc.slug === slug);
}

export const docsBySlug = new Map(docs.map((doc) => [`${doc.locale}/${doc.slug}`, doc]));

export function renderMarkdown(markdown: string) {
  return marked.parse(markdown, { async: false, renderer }) as string;
}

export function escapeHtml(value: string) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
