import { namiComponentMetadata } from '@nami/ui/metadata';
import { createNamiThemeSystem, themeToCssText, type NamiThemeConfig } from '@nami/tokens/theme';

function escapeHtml(value: string) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function hexToRgb(value: string) {
  const hex = value.trim().replace(/^#/, '');
  const normalized = hex.length === 3 ? hex.split('').map((char) => char + char).join('') : hex;
  if (!/^[0-9a-f]{6}$/i.test(normalized)) return null;
  const number = Number.parseInt(normalized, 16);
  return {
    r: (number >> 16) & 255,
    g: (number >> 8) & 255,
    b: number & 255
  };
}

function contrastRatio(foreground: string, background: string) {
  const fg = hexToRgb(foreground);
  const bg = hexToRgb(background);
  if (!fg || !bg) return null;
  const luminance = ({ r, g, b }: { r: number; g: number; b: number }) => {
    const channels = [r, g, b].map((channel) => {
      const value = channel / 255;
      return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
    });
    return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
  };
  const light = Math.max(luminance(fg), luminance(bg));
  const dark = Math.min(luminance(fg), luminance(bg));
  return (light + 0.05) / (dark + 0.05);
}

function readDtcgCssVars(document: unknown) {
  const vars: Record<string, string> = {};
  if (!document || typeof document !== 'object') return vars;
  const groups = ['cssVars', 'palette', 'semantic', 'component', 'style'];
  for (const group of groups) {
    const tokens = (document as Record<string, unknown>)[group];
    if (!tokens || typeof tokens !== 'object') continue;
    for (const [token, value] of Object.entries(tokens as Record<string, unknown>)) {
      if (!token.startsWith('--nami-') || !value || typeof value !== 'object' || !('$value' in value)) continue;
      vars[token] = String((value as { $value: unknown }).$value);
    }
  }
  return vars;
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
    return {
      accent: theme?.getAttribute('accent') || '#3b82f6',
      mode: theme?.getAttribute('theme') === 'dark' ? 'dark' : 'light',
      stylePreset: preset === 'illustration' || preset === 'ant-illustration' ? 'illustration' : 'default',
      density: theme?.getAttribute('density') === 'compact' ? 'compact' : 'comfortable',
      motion: theme?.getAttribute('motion') === 'reduced' ? 'reduced' : 'normal',
      radius: theme?.getAttribute('radius') === 'sharp' || theme?.getAttribute('radius') === 'soft'
        ? theme.getAttribute('radius')
        : 'round',
      contrast: theme?.getAttribute('contrast') === 'high' ? 'high' : 'normal'
    } as const;
  }

  private updateOutput() {
    const seed = this.readSeed();
    const config: NamiThemeConfig = {
      seed,
      tokens: this.importedTokens
    };
    const resolved = createNamiThemeSystem(config);
    const tokenTree = this.querySelector('[data-derived-token-tree]');
    const cssBlock = this.querySelector('nami-docs-code-block[data-generated-css]') as HTMLElement | null;
    const jsonBlock = this.querySelector('nami-docs-code-block[data-generated-json]') as HTMLElement | null;
    const tsBlock = this.querySelector('nami-docs-code-block[data-generated-ts]') as HTMLElement | null;
    const affected = this.querySelector('[data-affected-components]');
    const diagnostics = this.querySelector('[data-theme-diagnostics]');
    const preview = this.querySelector('[data-designer-preview]') as HTMLElement | null;
    const cssText = themeToCssText(resolved, '.my-nami-theme');
    const dtcg = resolved.dtcg();
    const tsConfig = `import { defineNamiTheme } from '@nami/tokens/theme';\n\nexport default defineNamiTheme(${JSON.stringify(config, null, 2)});\n`;
    const textContrast = contrastRatio(resolved.cssVars['--nami-text'], resolved.cssVars['--nami-surface']);
    const accentContrast = contrastRatio(resolved.cssVars['--nami-accent-50'], resolved.cssVars['--nami-surface']);
    const tokenEntries = [
      ['Seed', resolved.seed],
      ['Palette', resolved.palette],
      ['Semantic', resolved.semantic],
      ['Style', resolved.style],
      ['Component', resolved.component]
    ];
    const derivedTokens = new Set(Object.keys(resolved.cssVars));
    const affectedComponents = namiComponentMetadata
      .filter((item) => item.tokens.some((token) => derivedTokens.has(token)))
      .map((item) => item.name);

    if (tokenTree) {
      tokenTree.innerHTML = tokenEntries.map(([label, value]) => `
        <nami-card variant="inset">
          <nami-badge slot="header" variant="primary">${label}</nami-badge>
          <dl class="token-dl">
            ${Object.entries(value as Record<string, unknown>).slice(0, 12).map(([key, tokenValue]) => `<dt>${escapeHtml(key)}</dt><dd>${escapeHtml(String(tokenValue))}</dd>`).join('')}
          </dl>
        </nami-card>
      `).join('');
    }

    if (cssBlock) cssBlock.dataset.code = encodeURIComponent(cssText);
    if (jsonBlock) jsonBlock.dataset.code = encodeURIComponent(JSON.stringify(dtcg, null, 2));
    if (tsBlock) tsBlock.dataset.code = encodeURIComponent(tsConfig);

    if (affected) {
      affected.innerHTML = affectedComponents.map((name) => `<nami-badge variant="primary">${name}</nami-badge>`).join('');
    }

    if (diagnostics) {
      const items = [
        ['Text / surface', textContrast],
        ['Accent / surface', accentContrast]
      ];
      diagnostics.innerHTML = items.map(([label, value]) => {
        const ratio = typeof value === 'number' ? value : null;
        const passes = ratio !== null && ratio >= 4.5;
        const state = ratio === null ? 'unknown' : passes ? 'pass' : 'review';
        const display = ratio === null ? 'n/a' : `${ratio.toFixed(2)}:1`;
        return `<nami-alert variant="${passes ? 'success' : 'warning'}" title="${escapeHtml(String(label))}">${escapeHtml(display)} · ${escapeHtml(state)}</nami-alert>`;
      }).join('');
    }

    if (preview) {
      preview.style.cssText = Object.entries(resolved.cssVars).map(([token, value]) => `${token}: ${value}`).join(';');
      preview.dataset.namiTheme = resolved.seed.mode;
      preview.dataset.namiStyle = resolved.seed.stylePreset;
      preview.dataset.namiDensity = resolved.seed.density;
      preview.dataset.namiMotion = resolved.seed.motion;
      preview.dataset.namiRadius = resolved.seed.radius;
      preview.dataset.namiContrast = resolved.seed.contrast;
    }
  }
}

if (!customElements.get('nami-docs-code-block')) customElements.define('nami-docs-code-block', NamiDocsCodeBlock);
if (!customElements.get('nami-docs-live-demo')) customElements.define('nami-docs-live-demo', NamiDocsLiveDemo);
if (!customElements.get('nami-docs-theme-designer')) customElements.define('nami-docs-theme-designer', NamiDocsThemeDesigner);
