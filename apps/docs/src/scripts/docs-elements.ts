import { rlComponentMetadata } from '@rin-labs/ui';
import { deriveRinTheme, themeToCssText } from '@rin-labs/tokens/theme';

function escapeHtml(value: string) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

class RinDocsCodeBlock extends HTMLElement {
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

class RinDocsLiveDemo extends HTMLElement {
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
        <rin-docs-code-block data-language="html" data-code="${encodeURIComponent(code)}"></rin-docs-code-block>
      </div>
    `;
  }
}

class RinDocsThemeDesigner extends HTMLElement {
  connectedCallback() {
    this.addEventListener('rl-change', this.scheduleUpdate);
    this.addEventListener('click', this.scheduleUpdate);
    this.scheduleUpdate();
  }

  disconnectedCallback() {
    this.removeEventListener('rl-change', this.scheduleUpdate);
    this.removeEventListener('click', this.scheduleUpdate);
  }

  private scheduleUpdate = () => {
    requestAnimationFrame(() => this.updateOutput());
  };

  private readSeed() {
    const theme = document.querySelector('rl-theme');
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
    const resolved = deriveRinTheme(this.readSeed());
    const tokenTree = this.querySelector('[data-derived-token-tree]');
    const cssBlock = this.querySelector('rin-docs-code-block[data-generated-css]') as HTMLElement | null;
    const affected = this.querySelector('[data-affected-components]');
    const preview = this.querySelector('[data-designer-preview]') as HTMLElement | null;
    const cssText = themeToCssText(resolved, '.my-rin-theme');
    const tokenEntries = [
      ['Seed', resolved.seed],
      ['Palette', resolved.palette],
      ['Semantic', resolved.semantic],
      ['Style', resolved.style],
      ['Component', resolved.component]
    ];
    const derivedTokens = new Set(Object.keys(resolved.cssVars));
    const affectedComponents = rlComponentMetadata
      .filter((item) => item.tokens.some((token) => derivedTokens.has(token)))
      .map((item) => item.name);

    if (tokenTree) {
      tokenTree.innerHTML = tokenEntries.map(([label, value]) => `
        <rl-card variant="inset">
          <rl-badge slot="header" variant="primary">${label}</rl-badge>
          <dl class="token-dl">
            ${Object.entries(value as Record<string, unknown>).slice(0, 12).map(([key, tokenValue]) => `<dt>${escapeHtml(key)}</dt><dd>${escapeHtml(String(tokenValue))}</dd>`).join('')}
          </dl>
        </rl-card>
      `).join('');
    }

    if (cssBlock) cssBlock.dataset.code = encodeURIComponent(cssText);

    if (affected) {
      affected.innerHTML = affectedComponents.map((name) => `<rl-badge variant="primary">${name}</rl-badge>`).join('');
    }

    if (preview) {
      preview.style.cssText = Object.entries(resolved.cssVars).map(([token, value]) => `${token}: ${value}`).join(';');
      preview.dataset.rlTheme = resolved.seed.mode;
      preview.dataset.rlStyle = resolved.seed.stylePreset;
      preview.dataset.rlDensity = resolved.seed.density;
      preview.dataset.rlMotion = resolved.seed.motion;
      preview.dataset.rlRadius = resolved.seed.radius;
      preview.dataset.rlContrast = resolved.seed.contrast;
    }
  }
}

if (!customElements.get('rin-docs-code-block')) customElements.define('rin-docs-code-block', RinDocsCodeBlock);
if (!customElements.get('rin-docs-live-demo')) customElements.define('rin-docs-live-demo', RinDocsLiveDemo);
if (!customElements.get('rin-docs-theme-designer')) customElements.define('rin-docs-theme-designer', RinDocsThemeDesigner);
