import { rlComponentMetadata, type RlComponentMetadata } from '@rin-labs/ui';
import { componentGroups, componentNameFromSlug, componentPreviews, componentSlug, metadataByName } from '../component-catalog';
import { docs, docsBySlug, escapeHtml, renderMarkdown } from '../content';
import { hrefForPath } from '../routes';

function renderList(values: string[]) {
  return values.length > 0 ? values.join(', ') : 'none';
}

function renderComponentSummary(item: RlComponentMetadata) {
  return `
    <rl-card data-component-card="${item.name}">
      <div class="component-preview">${componentPreviews.get(item.name) ?? escapeHtml(item.usage)}</div>
      <div class="component-copy">
        <rl-badge slot="header" variant="primary">${item.name}</rl-badge>
        <h3>${item.name}</h3>
        <p>${item.summary}</p>
        <a class="text-link" href="${hrefForPath(`/components/${componentSlug(item.name)}`)}">Open component reference</a>
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
        <p>${item.summary}</p>
        <rin-docs-code-block data-language="html" data-code="${encodeURIComponent(item.usage)}"></rin-docs-code-block>
        <dl>
          <dt>Attributes</dt><dd>${renderList(item.attributes)}</dd>
          <dt>Properties</dt><dd>${renderList(item.properties)}</dd>
          <dt>Events</dt><dd>${renderList(item.events)}</dd>
          <dt>Slots</dt><dd>${renderList(item.slots)}</dd>
          <dt>Parts</dt><dd>${renderList(item.parts)}</dd>
          <dt>CSS custom properties</dt><dd>${renderList(item.tokens)}</dd>
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
          <p class="eyebrow">Rin UI v1.0</p>
          <h1>Rin UI</h1>
          <p class="hero-subtitle">Web Components UI library for themeable apps.</p>
          <p class="lead">A Lit-based component system with standard custom elements, token-driven themes, default and illustration skins, routed Markdown guides, and metadata-generated API pages.</p>
          <div class="hero-actions">
            <rl-button id="docs-open-theme">Theme controls</rl-button>
            <rl-button variant="soft" id="docs-show-toast">Show toast</rl-button>
          </div>
          <div class="hero-proof" aria-label="Library strengths">
            <rl-badge>Framework agnostic</rl-badge>
            <rl-badge>CSS variable themes</rl-badge>
            <rl-badge>Accessible interactions</rl-badge>
            <rl-badge>Tree-shakable entries</rl-badge>
          </div>
        </div>
        <section class="hero-showcase" aria-label="Interactive component preview">
          <div class="showcase-bar">
            <rl-tab-bar data-theme-mode value="light">
              <button value="light">Light</button>
              <button value="dark">Dark</button>
            </rl-tab-bar>
            <rl-chip data-style-toggle checkbox value="illustration">Illustration</rl-chip>
          </div>
          <div class="showcase-grid">
            <rl-card class="component-wall">
              <div class="preview-toolbar">
                <rl-chip checkbox selected value="token">Token</rl-chip>
                <rl-chip checkbox value="docs">Docs</rl-chip>
                <rl-icon-button label="Favorite" selected><span slot="icon">F</span></rl-icon-button>
              </div>
              <rl-input label="Search components" placeholder="button, theme, dialog" helper-text="Focus, border, and text color follow tokens.">
                <span slot="icon">/</span>
              </rl-input>
              <rl-radio-card selected label="One source, two skins" description="Default and illustration presets share the same Web Component code."></rl-radio-card>
              <div class="preview-actions">
                <rl-button>Primary</rl-button>
                <rl-button variant="soft">Soft</rl-button>
                <rl-switch checked>Live</rl-switch>
              </div>
            </rl-card>
            <rl-card class="install-card">
              <rl-badge slot="header" variant="primary">Install</rl-badge>
              <rin-docs-code-block data-language="bash" data-code="${encodeURIComponent('npm install @rin-labs/ui @rin-labs/themes')}"></rin-docs-code-block>
              <rin-docs-code-block data-language="ts" data-code="${encodeURIComponent(`import '@rin-labs/themes/default.css';\nimport '@rin-labs/ui/register';`)}"></rin-docs-code-block>
              <div class="swatches" aria-label="Accent color">
                <button data-accent="#3b82f6" style="--swatch: #3b82f6">Blue</button>
                <button data-accent="#14b8a6" style="--swatch: #14b8a6">Teal</button>
                <button data-accent="#8b5cf6" style="--swatch: #8b5cf6">Violet</button>
              </div>
            </rl-card>
          </div>
        </section>
      </section>
      <section class="section">
        <div class="section-heading">
          <p class="eyebrow">Onion model</p>
          <h2>Home introduces, routes go deep</h2>
          <p>The homepage stays thin. Documentation, component API, tokens, and playground routes load only when you open them.</p>
        </div>
        <div class="info-grid">
          <rl-card>
            <rl-badge slot="header" variant="primary">Docs</rl-badge>
            <h3>Guides</h3>
            <p>Install, theme, style presets, framework integration, and quality contracts.</p>
            <rl-button slot="actions" variant="soft" onclick="location.hash='/docs/getting-started'">Start reading</rl-button>
          </rl-card>
          <rl-card>
            <rl-badge slot="header" variant="primary">Library</rl-badge>
            <h3>Components</h3>
            <p>Browse every public component with previews and metadata-driven API reference.</p>
            <rl-button slot="actions" variant="soft" onclick="location.hash='/components'">View components</rl-button>
          </rl-card>
          <rl-card>
            <rl-badge slot="header" variant="primary">System</rl-badge>
            <h3>Tokens and Lab</h3>
            <p>Inspect token layers or stress-test default and illustration skins in the Theme Lab.</p>
            <rl-button slot="actions" variant="soft" onclick="location.hash='/playground/theme-lab'">Open lab</rl-button>
          </rl-card>
        </div>
      </section>
    `;
  }
}

export class RinDocsMarkdownPage extends HTMLElement {
  static observedAttributes = ['slug'];

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  private render() {
    const slug = this.getAttribute('slug') ?? 'overview';
    const doc = docsBySlug.get(slug);
    if (!doc) {
      this.innerHTML = `<rl-empty title="Guide not found" description="Open a known documentation route."><rl-button slot="actions" variant="soft" onclick="location.hash='/docs/overview'">Back to docs</rl-button></rl-empty>`;
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
          <p class="eyebrow">Components</p>
          <h2>Browse the library surface</h2>
          <p>Open a component route for usage, attributes, properties, events, slots, parts, and token hooks.</p>
        </div>
        <div id="component-docs" class="component-docs">
          ${componentGroups.map((group) => `
            <section class="component-group">
              <h3>${group.title}</h3>
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
      this.innerHTML = `<rl-empty title="Component not found" description="Open a known component route."><rl-button slot="actions" variant="soft" onclick="location.hash='/components'">Back to components</rl-button></rl-empty>`;
      return;
    }

    this.innerHTML = `
      <section class="section">
        <div class="section-heading">
          <p class="eyebrow">Component API</p>
          <h2>${item.name}</h2>
          <p>${item.summary}</p>
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
          <p class="eyebrow">Tokens</p>
          <h2>Seed, semantic, component</h2>
          <p>Rin UI keeps theme replacement behind CSS variables. Components consume semantic and component tokens, while style presets rewrite the surface language.</p>
        </div>
        <div class="token-pipeline">
          <rl-card><rl-badge slot="header" variant="primary">Seed</rl-badge><strong>--rl-accent-50</strong><p>Brand input and motion/radius defaults.</p></rl-card>
          <rl-card><rl-badge slot="header" variant="primary">Semantic</rl-badge><strong>--rl-color-primary</strong><p>Meaning shared across components.</p></rl-card>
          <rl-card><rl-badge slot="header" variant="primary">Component</rl-badge><strong>--rl-button-bg</strong><p>Per-component override boundary.</p></rl-card>
        </div>
        <rl-card>
          <h3 slot="header">Metadata coverage</h3>
          <p>${tokenCount} token hooks are referenced by component metadata.</p>
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
          <p class="eyebrow">Theme Lab</p>
          <h2>Stress-test the full contract</h2>
          <p>Accent, dark mode, density, motion, and style preset update through the root <code>rl-theme</code> boundary.</p>
        </div>
        <div class="theme-lab-grid">
          <rl-card>
            <h3 slot="header">Controls</h3>
            <div class="control-stack">
              <rl-tab-bar data-theme-mode value="light">
                <button value="light">Light</button>
                <button value="dark">Dark</button>
              </rl-tab-bar>
              <div class="swatches">
                <button data-accent="#3b82f6" style="--swatch: #3b82f6">Blue</button>
                <button data-accent="#14b8a6" style="--swatch: #14b8a6">Teal</button>
                <button data-accent="#8b5cf6" style="--swatch: #8b5cf6">Violet</button>
              </div>
              <rl-chip data-density-toggle checkbox value="compact">Compact density</rl-chip>
              <rl-switch data-motion-toggle>Reduced motion</rl-switch>
              <rl-chip data-style-toggle checkbox value="illustration">Illustration style</rl-chip>
            </div>
          </rl-card>
          <rl-card>
            <h3 slot="header">Live surface</h3>
            <div class="theme-live-surface">
              <rl-button>Primary action</rl-button>
              <rl-button variant="soft">Soft action</rl-button>
              <rl-chip checkbox selected value="active">Selected chip</rl-chip>
              <rl-switch checked>Enabled</rl-switch>
              <rl-radio-card selected label="Current skin" description="This card follows the current root theme."></rl-radio-card>
            </div>
          </rl-card>
        </div>
        <div class="theme-contract-grid">
          <section class="theme-contract-stage" data-contract-stage="default-light">
            <h3>Default light</h3>
            <div class="contract-controls"><rl-button>Primary</rl-button><rl-chip checkbox selected value="default-light">Selected</rl-chip><rl-switch checked>On</rl-switch><rl-radio-card selected label="Card" description="Light neutral tokens."></rl-radio-card><rl-button loading>Loading</rl-button></div>
          </section>
          <section class="theme-contract-stage rl-theme-dark" data-contract-stage="default-dark">
            <h3>Default dark</h3>
            <div class="contract-controls"><rl-button>Primary</rl-button><rl-chip checkbox selected value="default-dark">Selected</rl-chip><rl-switch checked>On</rl-switch><rl-radio-card selected label="Card" description="Dark neutral tokens."></rl-radio-card><rl-button loading>Loading</rl-button></div>
          </section>
          <section class="theme-contract-stage rl-theme-illustration" data-contract-stage="illustration-light">
            <h3>Illustration light</h3>
            <div class="contract-controls"><rl-button>Primary</rl-button><rl-chip checkbox selected value="illustration-light">Selected</rl-chip><rl-switch checked>On</rl-switch><rl-radio-card selected label="Paper card" description="Light hand-drawn controls."></rl-radio-card><rl-button loading>Loading</rl-button></div>
          </section>
          <section class="theme-contract-stage rl-theme-dark rl-theme-illustration" data-contract-stage="illustration-dark">
            <h3>Illustration dark</h3>
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
