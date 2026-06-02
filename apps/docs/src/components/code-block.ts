import { escapeHtml } from '../content';

export class RinDocsCodeBlock extends HTMLElement {
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

customElements.define('rin-docs-code-block', RinDocsCodeBlock);
