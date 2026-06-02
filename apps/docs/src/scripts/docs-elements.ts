import { namiComponentMetadata } from '@nami/ui/metadata';
import { deriveNamiTheme, themeToCssText } from '@nami/tokens/theme';

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

class NamiDocsThemeDesigner extends HTMLElement {
  connectedCallback() {
    this.addEventListener('nami-change', this.scheduleUpdate);
    this.addEventListener('click', this.scheduleUpdate);
    this.scheduleUpdate();
  }

  disconnectedCallback() {
    this.removeEventListener('nami-change', this.scheduleUpdate);
    this.removeEventListener('click', this.scheduleUpdate);
  }

  private scheduleUpdate = () => {
    requestAnimationFrame(() => this.updateOutput());
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
    const resolved = deriveNamiTheme(this.readSeed());
    const tokenTree = this.querySelector('[data-derived-token-tree]');
    const cssBlock = this.querySelector('nami-docs-code-block[data-generated-css]') as HTMLElement | null;
    const affected = this.querySelector('[data-affected-components]');
    const preview = this.querySelector('[data-designer-preview]') as HTMLElement | null;
    const cssText = themeToCssText(resolved, '.my-nami-theme');
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

    if (affected) {
      affected.innerHTML = affectedComponents.map((name) => `<nami-badge variant="primary">${name}</nami-badge>`).join('');
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
