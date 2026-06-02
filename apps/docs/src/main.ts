import { marked } from 'marked';
import '@rin-labs/themes/default.css';
import '@rin-labs/themes/ant-illustration.css';
import '@rin-labs/ui/register';
import { RlToast, rlComponentMetadata } from '@rin-labs/ui';
import './styles.css';

interface DocPage {
  slug: string;
  title: string;
  group: string;
  order: number;
  markdown: string;
}

const rawDocs = import.meta.glob('./content/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;

const theme = document.querySelector('rl-theme');
const drawer = document.querySelector('rl-drawer');
const docIndex = document.querySelector('#doc-index');
const markdownPages = document.querySelector('#markdown-pages');
const componentDocs = document.querySelector('#component-docs');

function escapeHtml(value: string) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
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
    slug,
    title: meta.get('title') ?? slug,
    group: meta.get('group') ?? 'Guide',
    order: Number(meta.get('order') ?? 999),
    markdown
  };
}

const docs = Object.entries(rawDocs)
  .map(([path, source]) => parseDocPage(path, source))
  .sort((a, b) => a.order - b.order);

const renderer = new marked.Renderer();
renderer.code = ({ text, lang }) => {
  const info = (lang ?? '').trim();
  const [language, ...flags] = info.split(/\s+/);
  const escaped = escapeHtml(text);

  if (language === 'html' && flags.includes('live')) {
    return `
      <div class="live-example" data-live-example>
        <div class="live-preview">${text}</div>
        <pre><code class="language-html">${escaped}</code></pre>
      </div>
    `;
  }

  return `<pre><code class="${language ? `language-${language}` : ''}">${escaped}</code></pre>`;
};

function renderMarkdown(markdown: string) {
  return marked.parse(markdown, { async: false, renderer }) as string;
}

function renderList(values: string[]) {
  return values.length > 0 ? values.join(', ') : 'none';
}

function renderDocIndex() {
  docIndex?.replaceChildren(
    ...docs.map((doc) => {
      const link = document.createElement('a');
      link.className = 'doc-index-card';
      link.href = `#doc-${doc.slug}`;
      link.innerHTML = `
        <span>${doc.group}</span>
        <strong>${doc.title}</strong>
      `;
      return link;
    })
  );
}

function renderMarkdownDocs() {
  markdownPages?.replaceChildren(
    ...docs.map((doc) => {
      const article = document.createElement('article');
      article.id = `doc-${doc.slug}`;
      article.className = 'markdown-page';
      article.innerHTML = renderMarkdown(doc.markdown);
      return article;
    })
  );
}

function renderComponentDocs() {
  componentDocs?.replaceChildren(
    ...rlComponentMetadata.map((item) => {
      const article = document.createElement('article');
      article.className = 'component-entry';
      article.innerHTML = `
        <h3>${item.name}</h3>
        <p>${item.summary}</p>
        <pre><code>${escapeHtml(item.usage)}</code></pre>
        <dl>
          <dt>Attributes</dt><dd>${renderList(item.attributes)}</dd>
          <dt>Properties</dt><dd>${renderList(item.properties)}</dd>
          <dt>Events</dt><dd>${renderList(item.events)}</dd>
          <dt>Slots</dt><dd>${renderList(item.slots)}</dd>
          <dt>Parts</dt><dd>${renderList(item.parts)}</dd>
          <dt>CSS custom properties</dt><dd>${renderList(item.tokens)}</dd>
        </dl>
      `;
      return article;
    })
  );
}

function setThemeMode(value: 'light' | 'dark') {
  if (!theme) return;
  theme.theme = value;
  document.querySelectorAll<HTMLElement>('#docs-theme-mode, #drawer-theme-mode').forEach((control) => {
    (control as HTMLElement & { value: string }).value = value;
  });
}

function setCompactDensity(selected: boolean) {
  if (!theme) return;
  theme.density = selected ? 'compact' : 'comfortable';
  document.querySelectorAll<HTMLElement>('#docs-compact, #drawer-compact').forEach((control) => {
    (control as HTMLElement & { selected: boolean }).selected = selected;
  });
}

function setReducedMotion(checked: boolean) {
  if (!theme) return;
  theme.motion = checked ? 'reduced' : 'normal';
  document.querySelectorAll<HTMLElement>('#docs-reduced-motion, #drawer-reduced-motion').forEach((control) => {
    (control as HTMLElement & { checked: boolean }).checked = checked;
  });
}

function setStylePreset(selected: boolean) {
  if (!theme) return;
  theme.stylePreset = selected ? 'illustration' : 'default';
  document.querySelectorAll<HTMLElement>('#docs-illustration-style, #drawer-illustration-style').forEach((control) => {
    (control as HTMLElement & { selected: boolean }).selected = selected;
  });
}

function bindThemeControls() {
  document.querySelector('#docs-open-theme')?.addEventListener('rl-click', () => {
    if (drawer) drawer.open = true;
  });

  document.querySelector('#docs-toggle-theme')?.addEventListener('rl-click', () => {
    if (!theme) return;
    setThemeMode(theme.theme === 'dark' ? 'light' : 'dark');
  });

  document.querySelector('#docs-show-toast')?.addEventListener('rl-click', () => {
    RlToast.show({ message: 'Markdown docs and theme tokens are active.', variant: 'success' });
  });

  document.querySelectorAll<HTMLElement>('#docs-theme-mode, #drawer-theme-mode').forEach((control) => {
    control.addEventListener('rl-change', (event) => {
      const value = (event as CustomEvent<{ value: 'light' | 'dark' }>).detail.value;
      setThemeMode(value ?? 'light');
    });
  });

  document.querySelectorAll<HTMLButtonElement>('[data-accent]').forEach((button) => {
    button.addEventListener('click', () => {
      if (!theme) return;
      theme.accent = button.dataset.accent ?? '#3b82f6';
    });
  });

  bindBooleanControl('#docs-compact, #drawer-compact', 'selected', setCompactDensity);
  bindBooleanControl('#docs-reduced-motion, #drawer-reduced-motion', 'checked', setReducedMotion);
  bindBooleanControl('#docs-illustration-style, #drawer-illustration-style', 'selected', setStylePreset);
}

function bindBooleanControl(selector: string, property: 'selected' | 'checked', sync: (value: boolean) => void) {
  document.querySelectorAll<HTMLElement>(selector).forEach((control) => {
    let changed = false;
    control.addEventListener('rl-change', (event) => {
      changed = true;
      const detail = (event as CustomEvent<Record<string, unknown>>).detail;
      sync(Boolean(detail[property]));
    });
    control.addEventListener('click', () => {
      requestAnimationFrame(() => {
        if (!changed) sync(!Boolean((control as unknown as Record<string, unknown>)[property]));
        changed = false;
      });
    });
  });
}

renderDocIndex();
renderMarkdownDocs();
renderComponentDocs();
bindThemeControls();
