import { rlComponentMetadata, type RlComponentMetadata } from '@rin-labs/ui';
import { componentGroups, componentGroupTitle, componentNameFromSlug, componentPreviews, componentSlug, metadataByName } from '../component-catalog';
import { docBySlug, escapeHtml, renderMarkdown } from '../content';
import { currentLocale, hrefForPath } from '../routes';
import { componentSummary, t, tokenCoverageText } from '../i18n';

function renderList(values: string[]) {
  return values.length > 0 ? values.join(', ') : t('none', 'docs.common.none');
}

function renderComponentSummary(item: RlComponentMetadata) {
  return `
    <rl-card data-component-card="${item.name}">
      <div class="component-preview">${componentPreviews.get(item.name) ?? escapeHtml(item.usage)}</div>
      <div class="component-copy">
        <rl-badge slot="header" variant="primary">${item.name}</rl-badge>
        <h3>${item.name}</h3>
        <p>${componentSummary(item)}</p>
        <a class="text-link" href="${hrefForPath(`/components/${componentSlug(item.name)}`)}">${t('Open component reference', 'docs.common.openComponent')}</a>
      </div>
    </rl-card>
  `;
}

function renderComponentReference(item: RlComponentMetadata) {
  return `
    <div class="component-reference">
      <rl-card>
        <rl-badge slot="header" variant="primary">${item.name}</rl-badge>
        <div class="component-preview">${componentPreviews.get(item.name) ?? escapeHtml(item.usage)}</div>
        <p>${componentSummary(item)}</p>
        <rin-docs-code-block data-language="html" data-code="${encodeURIComponent(item.usage)}"></rin-docs-code-block>
        <dl>
          <dt>${t('Attributes', 'docs.common.attributes')}</dt><dd>${renderList(item.attributes)}</dd>
          <dt>${t('Properties', 'docs.common.properties')}</dt><dd>${renderList(item.properties)}</dd>
          <dt>${t('Events', 'docs.common.events')}</dt><dd>${renderList(item.events)}</dd>
          <dt>${t('Slots', 'docs.common.slots')}</dt><dd>${renderList(item.slots)}</dd>
          <dt>${t('Parts', 'docs.common.parts')}</dt><dd>${renderList(item.parts)}</dd>
          <dt>${t('CSS custom properties', 'docs.common.cssProperties')}</dt><dd>${renderList(item.tokens)}</dd>
        </dl>
      </rl-card>
    </div>
  `;
}

export class RinDocsHome extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section class="hero" data-product-hero>
        <div class="hero-copy">
          <p class="eyebrow">${t('Rin UI v1.1', 'docs.home.eyebrow')}</p>
          <h1>Rin UI</h1>
          <p class="hero-subtitle">${t('Web Components UI library for themeable apps.', 'docs.home.subtitle')}</p>
          <p class="lead">${t('A Lit-based component system with standard custom elements, token-driven themes, default and illustration skins, routed Markdown guides, and metadata-generated API pages.', 'docs.home.lead')}</p>
          <div class="hero-actions">
            <rl-button id="docs-open-theme">${t('Theme controls', 'docs.home.themeControls')}</rl-button>
            <rl-button variant="soft" id="docs-show-toast">${t('Show toast', 'docs.home.showToast')}</rl-button>
          </div>
          <div class="hero-proof" aria-label="${t('Library strengths', 'docs.home.strengths')}">
            <rl-badge>${t('Framework agnostic', 'docs.home.frameworkAgnostic')}</rl-badge>
            <rl-badge>${t('CSS variable themes', 'docs.home.cssThemes')}</rl-badge>
            <rl-badge>${t('Accessible interactions', 'docs.home.accessible')}</rl-badge>
            <rl-badge>${t('Tree-shakable entries', 'docs.home.treeShakable')}</rl-badge>
          </div>
        </div>
        <section class="hero-showcase" aria-label="${t('Interactive component preview', 'docs.home.preview')}">
          <div class="showcase-bar">
            <rl-tab-bar data-theme-mode value="light">
                <button value="light">${t('Light', 'docs.controls.light')}</button>
                <button value="dark">${t('Dark', 'docs.controls.dark')}</button>
              </rl-tab-bar>
            <rl-chip data-style-toggle checkbox value="illustration">${t('Illustration style', 'docs.controls.illustration')}</rl-chip>
          </div>
          <div class="showcase-grid">
            <rl-card class="component-wall">
              <div class="preview-toolbar">
                <rl-chip checkbox selected value="token">${t('Token', 'docs.home.token')}</rl-chip>
                <rl-chip checkbox value="docs">${t('Docs', 'docs.home.docs')}</rl-chip>
                <rl-icon-button label="${t('Favorite', 'docs.home.favorite')}" selected><span slot="icon">F</span></rl-icon-button>
              </div>
              <rl-input label="${t('Search components', 'docs.home.search')}" placeholder="${t('button, theme, dialog', 'docs.home.searchPlaceholder')}" helper-text="${t('Focus, border, and text color follow tokens.', 'docs.home.searchHelper')}">
                <span slot="icon">/</span>
              </rl-input>
              <rl-radio-card selected label="${t('One source, two skins', 'docs.home.radioTitle')}" description="${t('Default and illustration presets share the same Web Component code.', 'docs.home.radioDescription')}"></rl-radio-card>
              <div class="preview-actions">
                <rl-button>${t('Primary', 'docs.home.primary')}</rl-button>
                <rl-button variant="soft">${t('Soft', 'docs.home.soft')}</rl-button>
                <rl-switch checked>${t('Live', 'docs.home.live')}</rl-switch>
              </div>
            </rl-card>
            <rl-card class="install-card">
              <rl-badge slot="header" variant="primary">${t('Install', 'docs.home.install')}</rl-badge>
              <rin-docs-code-block data-language="bash" data-code="${encodeURIComponent('npm install @rin-labs/ui @rin-labs/themes')}"></rin-docs-code-block>
              <rin-docs-code-block data-language="ts" data-code="${encodeURIComponent(`import '@rin-labs/themes/default.css';\nimport '@rin-labs/ui/register';`)}"></rin-docs-code-block>
              <div class="swatches" aria-label="${t('Accent color', 'docs.controls.accent')}">
                <button data-accent="#3b82f6" style="--swatch: #3b82f6">${t('Blue', 'docs.controls.blue')}</button>
                <button data-accent="#14b8a6" style="--swatch: #14b8a6">${t('Teal', 'docs.controls.teal')}</button>
                <button data-accent="#8b5cf6" style="--swatch: #8b5cf6">${t('Violet', 'docs.controls.violet')}</button>
              </div>
            </rl-card>
          </div>
        </section>
      </section>
      <section class="section">
        <div class="section-heading">
          <p class="eyebrow">${t('Onion model', 'docs.home.modelEyebrow')}</p>
          <h2>${t('Home introduces, routes go deep', 'docs.home.modelTitle')}</h2>
          <p>${t('The homepage stays thin. Documentation, component API, tokens, and playground routes load only when you open them.', 'docs.home.modelCopy')}</p>
        </div>
        <div class="info-grid">
          <rl-card>
            <rl-badge slot="header" variant="primary">${t('Docs', 'docs.home.docs')}</rl-badge>
            <h3>${t('Guides', 'docs.home.guides')}</h3>
            <p>${t('Install, theme, style presets, framework integration, and quality contracts.', 'docs.home.guidesCopy')}</p>
            <rl-button slot="actions" variant="soft" onclick="location.hash='${hrefForPath('/docs/getting-started').slice(1)}'">${t('Start reading', 'docs.home.startReading')}</rl-button>
          </rl-card>
          <rl-card>
            <rl-badge slot="header" variant="primary">${t('Library', 'docs.home.library')}</rl-badge>
            <h3>${t('Components', 'docs.nav.components')}</h3>
            <p>${t('Browse every public component with previews and metadata-driven API reference.', 'docs.home.componentsCopy')}</p>
            <rl-button slot="actions" variant="soft" onclick="location.hash='${hrefForPath('/components').slice(1)}'">${t('View components', 'docs.home.viewComponents')}</rl-button>
          </rl-card>
          <rl-card>
            <rl-badge slot="header" variant="primary">${t('System', 'docs.home.system')}</rl-badge>
            <h3>${t('Tokens and Lab', 'docs.home.tokensLab')}</h3>
            <p>${t('Inspect token layers or stress-test default and illustration skins in the Theme Lab.', 'docs.home.tokensCopy')}</p>
            <rl-button slot="actions" variant="soft" onclick="location.hash='${hrefForPath('/playground/theme-lab').slice(1)}'">${t('Open lab', 'docs.home.openLab')}</rl-button>
          </rl-card>
        </div>
      </section>
    `;
  }
}

export class RinDocsMarkdownPage extends HTMLElement {
  static observedAttributes = ['locale', 'slug'];

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  private render() {
    const slug = this.getAttribute('slug') ?? 'overview';
    const locale = this.getAttribute('locale') ?? currentLocale();
    const doc = docBySlug(locale, slug);
    if (!doc) {
      this.innerHTML = `<rl-empty title="${t('Guide not found', 'docs.empty.guideTitle')}" description="${t('Open a known documentation route.', 'docs.empty.guideDescription')}"><rl-button slot="actions" variant="soft" onclick="location.hash='${hrefForPath('/docs/overview').slice(1)}'">${t('Back to docs', 'docs.empty.backDocs')}</rl-button></rl-empty>`;
      return;
    }

    this.innerHTML = `
      <section class="section markdown-route">
        <div class="section-heading">
          <p class="eyebrow">${doc.group}</p>
          <h2>${doc.title}</h2>
        </div>
        <article id="doc-${doc.slug}" class="markdown-page">${renderMarkdown(doc.markdown)}</article>
      </section>
    `;
  }
}

export class RinDocsComponentIndex extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section class="section">
        <div class="section-heading">
          <p class="eyebrow">${t('Components', 'docs.components.eyebrow')}</p>
          <h2>${t('Browse the library surface', 'docs.components.title')}</h2>
          <p>${t('Open a component route for usage, attributes, properties, events, slots, parts, and token hooks.', 'docs.components.copy')}</p>
        </div>
        <div id="component-docs" class="component-docs">
          ${componentGroups.map((group) => `
            <section class="component-group">
              <h3>${componentGroupTitle(group)}</h3>
              <div class="component-group-grid">
                ${group.names.map((name) => {
                  const item = metadataByName.get(name);
                  return item ? renderComponentSummary(item) : '';
                }).join('')}
              </div>
            </section>
          `).join('')}
        </div>
      </section>
    `;
  }
}

export class RinDocsComponentPage extends HTMLElement {
  static observedAttributes = ['slug'];

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  private render() {
    const name = componentNameFromSlug(this.getAttribute('slug') ?? '');
    const item = metadataByName.get(name);
    if (!item) {
      this.innerHTML = `<rl-empty title="${t('Component not found', 'docs.empty.componentTitle')}" description="${t('Open a known component route.', 'docs.empty.componentDescription')}"><rl-button slot="actions" variant="soft" onclick="location.hash='${hrefForPath('/components').slice(1)}'">${t('Back to components', 'docs.empty.backComponents')}</rl-button></rl-empty>`;
      return;
    }

    this.innerHTML = `
      <section class="section">
        <div class="section-heading">
          <p class="eyebrow">${t('Component API', 'docs.component.eyebrow')}</p>
          <h2>${item.name}</h2>
          <p>${componentSummary(item)}</p>
        </div>
        <div id="component-docs">${renderComponentReference(item)}</div>
      </section>
    `;
  }
}

export class RinDocsTokensPage extends HTMLElement {
  connectedCallback() {
    const tokenCount = rlComponentMetadata.reduce((count, item) => count + item.tokens.length, 0);
    this.innerHTML = `
      <section class="section">
        <div class="section-heading">
          <p class="eyebrow">${t('Tokens', 'docs.tokens.eyebrow')}</p>
          <h2>${t('Seed, semantic, component', 'docs.tokens.title')}</h2>
          <p>${t('Rin UI keeps theme replacement behind CSS variables. Components consume semantic and component tokens, while style presets rewrite the surface language.', 'docs.tokens.copy')}</p>
        </div>
        <div class="token-pipeline">
          <rl-card><rl-badge slot="header" variant="primary">${t('Seed', 'docs.tokens.seed')}</rl-badge><strong>--rl-accent-50</strong><p>${t('Brand input and motion/radius defaults.', 'docs.tokens.seedCopy')}</p></rl-card>
          <rl-card><rl-badge slot="header" variant="primary">${t('Semantic', 'docs.tokens.semantic')}</rl-badge><strong>--rl-color-primary</strong><p>${t('Meaning shared across components.', 'docs.tokens.semanticCopy')}</p></rl-card>
          <rl-card><rl-badge slot="header" variant="primary">${t('Component', 'docs.tokens.component')}</rl-badge><strong>--rl-button-bg</strong><p>${t('Per-component override boundary.', 'docs.tokens.componentCopy')}</p></rl-card>
        </div>
        <rl-card>
          <h3 slot="header">${t('Metadata coverage', 'docs.tokens.coverage')}</h3>
          <p>${tokenCoverageText(tokenCount)}</p>
          <rin-docs-code-block data-language="html" data-code="${encodeURIComponent(`<rl-theme theme="dark" accent="#14b8a6" style-preset="illustration">\n  <rl-button>Save</rl-button>\n</rl-theme>`)}"></rin-docs-code-block>
        </rl-card>
      </section>
    `;
  }
}

export class RinDocsThemeLab extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section class="section">
        <div class="section-heading">
          <p class="eyebrow">${t('Theme Lab', 'docs.lab.eyebrow')}</p>
          <h2>${t('Stress-test the full contract', 'docs.lab.title')}</h2>
          <p>${t('Accent, dark mode, density, motion, and style preset update through the root', 'docs.lab.copy')} <code>rl-theme</code>.</p>
        </div>
        <div class="theme-lab-grid">
          <rl-card>
            <h3 slot="header">${t('Controls', 'docs.lab.controls')}</h3>
            <div class="control-stack">
              <rl-tab-bar data-theme-mode value="light">
                <button value="light">${t('Light', 'docs.controls.light')}</button>
                <button value="dark">${t('Dark', 'docs.controls.dark')}</button>
              </rl-tab-bar>
              <div class="swatches">
                <button data-accent="#3b82f6" style="--swatch: #3b82f6">${t('Blue', 'docs.controls.blue')}</button>
                <button data-accent="#14b8a6" style="--swatch: #14b8a6">${t('Teal', 'docs.controls.teal')}</button>
                <button data-accent="#8b5cf6" style="--swatch: #8b5cf6">${t('Violet', 'docs.controls.violet')}</button>
              </div>
              <rl-chip data-density-toggle checkbox value="compact">${t('Compact density', 'docs.controls.compact')}</rl-chip>
              <rl-switch data-motion-toggle>${t('Reduced motion', 'docs.controls.reducedMotion')}</rl-switch>
              <rl-chip data-style-toggle checkbox value="illustration">${t('Illustration style', 'docs.controls.illustration')}</rl-chip>
            </div>
          </rl-card>
          <rl-card>
            <h3 slot="header">${t('Live surface', 'docs.lab.surface')}</h3>
            <div class="theme-live-surface">
              <rl-button>${t('Primary action', 'docs.lab.primary')}</rl-button>
              <rl-button variant="soft">${t('Soft action', 'docs.lab.soft')}</rl-button>
              <rl-chip checkbox selected value="active">${t('Selected chip', 'docs.lab.selected')}</rl-chip>
              <rl-switch checked>${t('Enabled', 'docs.lab.enabled')}</rl-switch>
              <rl-radio-card selected label="${t('Current skin', 'docs.lab.currentSkin')}" description="${t('This card follows the current root theme.', 'docs.lab.currentSkinDescription')}"></rl-radio-card>
            </div>
          </rl-card>
        </div>
        <div class="theme-contract-grid">
          <section class="theme-contract-stage" data-contract-stage="default-light">
            <h3>${t('Default light', 'docs.lab.defaultLight')}</h3>
            <div class="contract-controls"><rl-button>Primary</rl-button><rl-chip checkbox selected value="default-light">Selected</rl-chip><rl-switch checked>On</rl-switch><rl-radio-card selected label="Card" description="Light neutral tokens."></rl-radio-card><rl-button loading>Loading</rl-button></div>
          </section>
          <section class="theme-contract-stage rl-theme-dark" data-contract-stage="default-dark">
            <h3>${t('Default dark', 'docs.lab.defaultDark')}</h3>
            <div class="contract-controls"><rl-button>Primary</rl-button><rl-chip checkbox selected value="default-dark">Selected</rl-chip><rl-switch checked>On</rl-switch><rl-radio-card selected label="Card" description="Dark neutral tokens."></rl-radio-card><rl-button loading>Loading</rl-button></div>
          </section>
          <section class="theme-contract-stage rl-theme-illustration" data-contract-stage="illustration-light">
            <h3>${t('Illustration light', 'docs.lab.illustrationLight')}</h3>
            <div class="contract-controls"><rl-button>Primary</rl-button><rl-chip checkbox selected value="illustration-light">Selected</rl-chip><rl-switch checked>On</rl-switch><rl-radio-card selected label="Paper card" description="Light hand-drawn controls."></rl-radio-card><rl-button loading>Loading</rl-button></div>
          </section>
          <section class="theme-contract-stage rl-theme-dark rl-theme-illustration" data-contract-stage="illustration-dark">
            <h3>${t('Illustration dark', 'docs.lab.illustrationDark')}</h3>
            <div class="contract-controls"><rl-button>Primary</rl-button><rl-chip checkbox selected value="illustration-dark">Selected</rl-chip><rl-switch checked>On</rl-switch><rl-radio-card selected label="Night paper card" description="Dark shell, paper controls, ink stroke."></rl-radio-card><rl-button loading>Loading</rl-button></div>
          </section>
        </div>
      </section>
    `;
  }
}

customElements.define('rin-docs-home', RinDocsHome);
customElements.define('rin-docs-markdown-page', RinDocsMarkdownPage);
customElements.define('rin-docs-component-index', RinDocsComponentIndex);
customElements.define('rin-docs-component-page', RinDocsComponentPage);
customElements.define('rin-docs-tokens-page', RinDocsTokensPage);
customElements.define('rin-docs-theme-lab', RinDocsThemeLab);
