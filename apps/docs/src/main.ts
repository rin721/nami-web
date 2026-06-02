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

const componentGroups = [
  { title: 'Theme and Layout', names: ['rl-theme', 'rl-app-shell'] },
  { title: 'Actions and Selection', names: ['rl-button', 'rl-icon-button', 'rl-chip', 'rl-tab-bar'] },
  { title: 'Forms', names: ['rl-input', 'rl-switch', 'rl-radio-card'] },
  { title: 'Feedback and Overlays', names: ['rl-spinner', 'rl-dialog', 'rl-drawer', 'rl-toast', 'rl-illustration', 'rl-empty', 'rl-result'] }
];

const componentPreviews = new Map<string, string>([
  ['rl-theme', '<rl-theme accent="#14b8a6" style-preset="illustration"><rl-button>Scoped theme</rl-button></rl-theme>'],
  ['rl-app-shell', '<div class="mini-shell"><span>Rail</span><strong>App shell</strong><small>Responsive layout slots</small></div>'],
  ['rl-button', '<rl-button>Primary</rl-button><rl-button variant="soft">Soft</rl-button>'],
  ['rl-icon-button', '<rl-icon-button label="Favorite" selected><span slot="icon">F</span></rl-icon-button>'],
  ['rl-chip', '<rl-chip checkbox selected value="docs">Docs</rl-chip><rl-chip checkbox value="theme">Theme</rl-chip>'],
  ['rl-tab-bar', '<rl-tab-bar value="Overview"><button value="Overview">Overview</button><button value="API">API</button></rl-tab-bar>'],
  ['rl-input', '<rl-input label="Search" placeholder="Try a token name"><span slot="icon">/</span></rl-input>'],
  ['rl-switch', '<rl-switch checked>Enabled</rl-switch>'],
  ['rl-radio-card', '<rl-radio-card selected label="Token driven" description="Selected state follows accent."></rl-radio-card>'],
  ['rl-spinner', '<rl-spinner size="md" label="Loading"></rl-spinner>'],
  ['rl-dialog', '<rl-button variant="soft">Dialog trigger</rl-button>'],
  ['rl-drawer', '<rl-button variant="soft">Drawer trigger</rl-button>'],
  ['rl-toast', '<rl-button variant="soft">Toast API</rl-button>'],
  ['rl-illustration', '<rl-illustration name="search" size="sm"></rl-illustration>'],
  ['rl-empty', '<rl-empty title="No results" description="Try changing filters." compact></rl-empty>'],
  ['rl-result', '<rl-result status="success" title="Ready" sub-title="The component rendered." compact></rl-result>']
]);

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
  const metadataByName = new Map(rlComponentMetadata.map((item) => [item.name, item]));

  componentDocs?.replaceChildren(
    ...componentGroups.map((group) => {
      const section = document.createElement('section');
      section.className = 'component-group';
      section.innerHTML = `<h3>${group.title}</h3>`;

      const grid = document.createElement('div');
      grid.className = 'component-group-grid';

      group.names.forEach((name) => {
        const item = metadataByName.get(name);
        if (!item) return;

        const article = document.createElement('article');
        article.className = 'component-entry';
        article.dataset.componentCard = item.name;
        article.innerHTML = `
          <div class="component-preview">${componentPreviews.get(item.name) ?? escapeHtml(item.usage)}</div>
          <div class="component-copy">
            <h4>${item.name}</h4>
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
          </div>
        `;
        grid.append(article);
      });

      section.append(grid);
      return section;
    })
  );
}

function setThemeMode(value: 'light' | 'dark') {
  if (!theme) return;
  theme.theme = value;
  document.querySelectorAll<HTMLElement>('#docs-theme-mode, #lab-theme-mode, #drawer-theme-mode').forEach((control) => {
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
  document.querySelectorAll<HTMLElement>('#docs-illustration-style, #lab-illustration-style, #drawer-illustration-style').forEach((control) => {
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

  document.querySelectorAll<HTMLElement>('#docs-theme-mode, #lab-theme-mode, #drawer-theme-mode').forEach((control) => {
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
  bindBooleanControl('#docs-illustration-style, #lab-illustration-style, #drawer-illustration-style', 'selected', setStylePreset);
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
