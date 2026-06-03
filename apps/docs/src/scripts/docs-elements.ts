import { namiComponentMetadata } from '@nami/ui/metadata';
import { createNamiThemeStudio, readDtcgCssVars } from '@nami/tokens/theme-studio';
import type { NamiThemeConfig } from '@nami/tokens/theme';

function escapeHtml(value: string) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

class NamiDocsCodeBlock extends HTMLElement {
  static observedAttributes = ['data-code', 'data-language'];

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  private render() {
    const code = decodeURIComponent(this.dataset.code ?? '');
    const language = this.dataset.language ? `language-${this.dataset.language}` : '';
    this.innerHTML = `<pre><code class="${language}">${escapeHtml(code)}</code></pre>`;
  }
}

class NamiDocsLiveDemo extends HTMLElement {
  static observedAttributes = ['data-code'];

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  private render() {
    const code = decodeURIComponent(this.dataset.code ?? '');
    this.innerHTML = `
      <div class="live-example" data-live-example>
        <div class="live-preview">${code}</div>
        <nami-docs-code-block data-language="html" data-code="${encodeURIComponent(code)}"></nami-docs-code-block>
      </div>
    `;
  }
}

class NamiDocsInstallTabs extends HTMLElement {
  connectedCallback() {
    if (!this.dataset.rendered) this.render();
  }

  private render() {
    const packages = this.dataset.packages || '@nami/ui @nami/themes';
    const commands = {
      npm: `npm install ${packages}`,
      pnpm: `pnpm add ${packages}`,
      yarn: `yarn add ${packages}`
    };
    this.dataset.rendered = 'true';
    this.innerHTML = `
      <div class="install-tabs" data-manager="npm">
        <nami-tab-bar value="npm" aria-label="Package manager">
          <button value="npm">npm</button>
          <button value="pnpm">pnpm</button>
          <button value="yarn">yarn</button>
        </nami-tab-bar>
        ${Object.entries(commands).map(([manager, command]) => `
          <nami-docs-code-block data-install-command="${manager}" data-language="bash" data-code="${encodeURIComponent(command)}"></nami-docs-code-block>
        `).join('')}
      </div>
    `;
    this.querySelector('nami-tab-bar')?.addEventListener('nami-change', (event) => {
      const detail = (event as CustomEvent<{ value?: string }>).detail;
      const value = detail?.value || (event.target as HTMLElement).getAttribute('value') || 'npm';
      this.querySelector<HTMLElement>('.install-tabs')?.setAttribute('data-manager', value);
    });
  }
}

class NamiDocsCallout extends HTMLElement {
  connectedCallback() {
    if (!this.hasAttribute('role')) this.setAttribute('role', 'note');
  }
}

class NamiDocsSteps extends HTMLElement {
  connectedCallback() {
    if (!this.hasAttribute('role')) this.setAttribute('role', 'list');
  }
}

class NamiDocsRelated extends HTMLElement {
  connectedCallback() {
    if (!this.hasAttribute('aria-label')) this.setAttribute('aria-label', 'Related links');
  }
}

class NamiDocsComponentSearch extends HTMLElement {
  private input: HTMLInputElement | null = null;

  connectedCallback() {
    this.input = this.querySelector('[data-component-search-input]');
    this.input?.addEventListener('input', this.filter);
    this.filter();
  }

  disconnectedCallback() {
    this.input?.removeEventListener('input', this.filter);
  }

  private filter = () => {
    const query = this.input?.value.trim().toLowerCase() ?? '';
    const cards = [...this.querySelectorAll<HTMLElement>('[data-component-card]')];
    let visibleCount = 0;

    for (const card of cards) {
      const search = card.dataset.search?.toLowerCase() ?? '';
      const visible = query.length === 0 || search.includes(query);
      card.hidden = !visible;
      if (visible) visibleCount += 1;
    }

    for (const section of this.querySelectorAll<HTMLElement>('[data-component-section]')) {
      section.hidden = section.querySelectorAll<HTMLElement>('[data-component-card]:not([hidden])').length === 0;
    }

    const empty = this.querySelector<HTMLElement>('[data-component-empty]');
    if (empty) empty.hidden = visibleCount > 0;
  };
}

class NamiDocsThemeDesigner extends HTMLElement {
  private importedTokens: Record<string, string> = {};

  connectedCallback() {
    this.addEventListener('nami-change', this.scheduleUpdate);
    this.addEventListener('click', this.scheduleUpdate);
    this.addEventListener('change', this.handleChange);
    this.scheduleUpdate();
  }

  disconnectedCallback() {
    this.removeEventListener('nami-change', this.scheduleUpdate);
    this.removeEventListener('click', this.scheduleUpdate);
    this.removeEventListener('change', this.handleChange);
  }

  private scheduleUpdate = () => {
    requestAnimationFrame(() => this.updateOutput());
  };

  private handleChange = async (event: Event) => {
    const target = event.target;
    if (!(target instanceof HTMLInputElement) || !target.matches('[data-dtcg-import]')) {
      this.scheduleUpdate();
      return;
    }
    const file = target.files?.[0];
    if (!file) return;
    try {
      this.importedTokens = readDtcgCssVars(JSON.parse(await file.text()));
    } catch {
      this.importedTokens = {};
    }
    this.scheduleUpdate();
  };

  private readSeed() {
    const theme = document.querySelector('nami-theme');
    const preset = theme?.getAttribute('style-preset');
    const size = theme?.getAttribute('size');
    const radius = theme?.getAttribute('radius');
    return {
      accent: theme?.getAttribute('accent') || '#3b82f6',
      mode: theme?.getAttribute('theme') === 'dark' ? 'dark' : 'light',
      stylePreset: preset === 'illustration' || preset === 'ant-illustration' ? 'illustration' : 'default',
      density: theme?.getAttribute('density') === 'compact' ? 'compact' : 'comfortable',
      size: size === 'sm' || size === 'lg' ? size : 'md',
      motion: theme?.getAttribute('motion') === 'reduced' ? 'reduced' : 'normal',
      radius: radius === 'sharp' || radius === 'soft' ? radius : 'round',
      contrast: theme?.getAttribute('contrast') === 'high' ? 'high' : 'normal'
    } as const;
  }

  private updateOutput() {
    const config: NamiThemeConfig = {
      seed: this.readSeed(),
      tokens: this.importedTokens
    };
    const studio = createNamiThemeStudio(config, { selector: '.my-nami-theme' });
    const resolved = studio.system;
    const tokenTree = this.querySelector('[data-derived-token-tree]');
    const cssBlock = this.querySelector('nami-docs-code-block[data-generated-css]') as HTMLElement | null;
    const jsonBlock = this.querySelector('nami-docs-code-block[data-generated-json]') as HTMLElement | null;
    const tsBlock = this.querySelector('nami-docs-code-block[data-generated-ts]') as HTMLElement | null;
    const affected = this.querySelector('[data-affected-components]');
    const diagnostics = this.querySelector('[data-theme-diagnostics]');
    const preview = this.querySelector('[data-designer-preview]') as HTMLElement | null;
    const derivedTokens = new Set(Object.keys(resolved.cssVars));
    const affectedComponents = namiComponentMetadata
      .filter((item) => item.tokens.some((token) => derivedTokens.has(token)))
      .map((item) => item.name);

    if (tokenTree) {
      tokenTree.innerHTML = studio.tokenTree.map(({ label, values }) => `
        <nami-card variant="inset">
          <nami-badge slot="header" variant="primary">${label}</nami-badge>
          <dl class="token-dl">
            ${Object.entries(values).slice(0, 12).map(([key, tokenValue]) => `<dt>${escapeHtml(key)}</dt><dd>${escapeHtml(String(tokenValue))}</dd>`).join('')}
          </dl>
        </nami-card>
      `).join('');
    }

    if (cssBlock) cssBlock.dataset.code = encodeURIComponent(studio.cssText);
    if (jsonBlock) jsonBlock.dataset.code = encodeURIComponent(studio.dtcgJson);
    if (tsBlock) tsBlock.dataset.code = encodeURIComponent(studio.tsConfig);

    if (affected) {
      affected.innerHTML = affectedComponents.map((name) => `<nami-badge variant="primary">${name}</nami-badge>`).join('');
    }

    if (diagnostics) {
      diagnostics.innerHTML = studio.diagnostics.map((item) => {
        const passes = item.state === 'pass';
        const display = item.ratio === null ? 'n/a' : `${item.ratio.toFixed(2)}:1`;
        return `<nami-alert variant="${passes ? 'success' : 'warning'}" title="${escapeHtml(item.label)}">${escapeHtml(display)} · ${escapeHtml(item.state)}</nami-alert>`;
      }).join('');
    }

    if (preview) {
      preview.style.cssText = Object.entries(resolved.cssVars).map(([token, value]) => `${token}: ${value}`).join(';');
      preview.dataset.namiTheme = resolved.seed.mode;
      preview.dataset.namiStyle = resolved.seed.stylePreset;
      preview.dataset.namiDensity = resolved.seed.density;
      preview.dataset.namiSize = resolved.seed.size;
      preview.dataset.namiMotion = resolved.seed.motion;
      preview.dataset.namiRadius = resolved.seed.radius;
      preview.dataset.namiContrast = resolved.seed.contrast;
    }
  }
}

if (!customElements.get('nami-docs-code-block')) customElements.define('nami-docs-code-block', NamiDocsCodeBlock);
if (!customElements.get('nami-docs-live-demo')) customElements.define('nami-docs-live-demo', NamiDocsLiveDemo);
if (!customElements.get('nami-docs-install-tabs')) customElements.define('nami-docs-install-tabs', NamiDocsInstallTabs);
if (!customElements.get('nami-docs-callout')) customElements.define('nami-docs-callout', NamiDocsCallout);
if (!customElements.get('nami-docs-steps')) customElements.define('nami-docs-steps', NamiDocsSteps);
if (!customElements.get('nami-docs-related')) customElements.define('nami-docs-related', NamiDocsRelated);
if (!customElements.get('nami-docs-component-search')) customElements.define('nami-docs-component-search', NamiDocsComponentSearch);
if (!customElements.get('nami-docs-theme-designer')) customElements.define('nami-docs-theme-designer', NamiDocsThemeDesigner);
