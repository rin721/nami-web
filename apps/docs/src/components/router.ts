import { docBySlug } from '../content';
import { componentNameFromSlug, metadataByName } from '../component-catalog';
import { currentRoute, hrefForPath, notifyRouteChange } from '../routes';
import { t } from '../i18n';

export class RinDocsRouter extends HTMLElement {
  connectedCallback() {
    window.addEventListener('hashchange', this.handleHashChange);
    window.addEventListener('lit-localize-status', this.handleHashChange as EventListener);
    this.render();
  }

  disconnectedCallback() {
    window.removeEventListener('hashchange', this.handleHashChange);
    window.removeEventListener('lit-localize-status', this.handleHashChange as EventListener);
  }

  private handleHashChange = () => this.render();

  private render() {
    const route = currentRoute();
    if (route.needsRedirect) {
      window.history.replaceState(null, '', hrefForPath(route.path, route.locale));
    }
    this.innerHTML = this.renderRoute(route.path, route.locale);
    notifyRouteChange(route);
  }

  private renderRoute(path: string, locale: string) {
    if (path === '/') return '<rin-docs-home></rin-docs-home>';

    const docsMatch = path.match(/^\/docs\/([^/]+)$/);
    if (docsMatch) {
      const slug = docsMatch[1];
      if (docBySlug(locale, slug)) return `<rin-docs-markdown-page locale="${locale}" slug="${slug}"></rin-docs-markdown-page>`;
    }

    if (path === '/components') return '<rin-docs-component-index></rin-docs-component-index>';

    const componentMatch = path.match(/^\/components\/([^/]+)$/);
    if (componentMatch) {
      const slug = componentMatch[1];
      if (metadataByName.has(componentNameFromSlug(slug))) return `<rin-docs-component-page slug="${slug}"></rin-docs-component-page>`;
    }

    if (path === '/tokens') return '<rin-docs-tokens-page></rin-docs-tokens-page>';
    if (path === '/playground/theme-lab') return '<rin-docs-theme-lab></rin-docs-theme-lab>';
    if (path === '/playground/theme-designer') return '<rin-docs-theme-designer></rin-docs-theme-designer>';

    return `
      <section class="section">
        <rl-empty title="${t('Route not found', 'docs.empty.routeTitle')}" description="${t('This documentation route does not exist.', 'docs.empty.routeDescription')}">
          <rl-button slot="actions" variant="soft" onclick="location.hash='${hrefForPath('/', locale).slice(1)}'">${t('Back home', 'docs.empty.backHome')}</rl-button>
        </rl-empty>
      </section>
    `;
  }
}

customElements.define('rin-docs-router', RinDocsRouter);
