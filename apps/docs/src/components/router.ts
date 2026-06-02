import { docsBySlug } from '../content';
import { componentNameFromSlug, metadataByName } from '../component-catalog';
import { currentPath, notifyRouteChange } from '../routes';

export class RinDocsRouter extends HTMLElement {
  connectedCallback() {
    window.addEventListener('hashchange', this.handleHashChange);
    this.render();
  }

  disconnectedCallback() {
    window.removeEventListener('hashchange', this.handleHashChange);
  }

  private handleHashChange = () => this.render();

  private render() {
    const path = currentPath();
    this.innerHTML = this.renderRoute(path);
    notifyRouteChange(path);
  }

  private renderRoute(path: string) {
    if (path === '/') return '<rin-docs-home></rin-docs-home>';

    const docsMatch = path.match(/^\/docs\/([^/]+)$/);
    if (docsMatch) {
      const slug = docsMatch[1];
      if (docsBySlug.has(slug)) return `<rin-docs-markdown-page slug="${slug}"></rin-docs-markdown-page>`;
    }

    if (path === '/components') return '<rin-docs-component-index></rin-docs-component-index>';

    const componentMatch = path.match(/^\/components\/([^/]+)$/);
    if (componentMatch) {
      const slug = componentMatch[1];
      if (metadataByName.has(componentNameFromSlug(slug))) return `<rin-docs-component-page slug="${slug}"></rin-docs-component-page>`;
    }

    if (path === '/tokens') return '<rin-docs-tokens-page></rin-docs-tokens-page>';
    if (path === '/playground/theme-lab') return '<rin-docs-theme-lab></rin-docs-theme-lab>';

    return `
      <section class="section">
        <rl-empty title="Route not found" description="This documentation route does not exist.">
          <rl-button slot="actions" variant="soft" onclick="location.hash='/'">Back home</rl-button>
        </rl-empty>
      </section>
    `;
  }
}

customElements.define('rin-docs-router', RinDocsRouter);
