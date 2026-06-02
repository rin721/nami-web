import { escapeHtml } from '../content';

export class RinDocsLiveDemo extends HTMLElement {
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
        <pre><code class="language-html">${escapeHtml(code)}</code></pre>
      </div>
    `;
  }
}

customElements.define('rin-docs-live-demo', RinDocsLiveDemo);
