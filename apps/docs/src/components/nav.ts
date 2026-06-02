import { hrefForPath, primaryNav, routeLinks, currentPath } from '../routes';

export class RinDocsNav extends HTMLElement {
  connectedCallback() {
    this.render();
    window.addEventListener('hashchange', this.handleRouteChange);
    window.addEventListener('rin-docs-route-change', this.handleRouteChange);
  }

  disconnectedCallback() {
    window.removeEventListener('hashchange', this.handleRouteChange);
    window.removeEventListener('rin-docs-route-change', this.handleRouteChange);
  }

  private handleRouteChange = () => this.render();

  private get placement() {
    return this.getAttribute('placement') ?? 'rail';
  }

  private render() {
    const path = currentPath();
    const links = this.placement === 'rail' ? primaryNav : this.placement === 'bottom' ? primaryNav.slice(0, 4) : routeLinks;
    const label = this.placement === 'rail' ? 'Primary sections' : 'Docs sections';

    this.innerHTML = `
      <nav class="${this.placement === 'rail' ? 'rail-stack' : 'bottom-nav'}" aria-label="${label}">
        ${links.map((link) => `
          <a href="${hrefForPath(link.path)}" aria-current="${path === link.path ? 'page' : 'false'}">
            ${this.placement === 'rail' ? link.shortLabel : link.label}
          </a>
        `).join('')}
      </nav>
    `;
  }
}

customElements.define('rin-docs-nav', RinDocsNav);
