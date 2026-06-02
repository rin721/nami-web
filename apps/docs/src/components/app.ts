import { RlToast } from '@rin-labs/ui';

export class RinDocsApp extends HTMLElement {
  connectedCallback() {
    this.render();
    this.addEventListener('click', this.handleClick);
    this.addEventListener('rl-click', this.handleRlClick as EventListener);
    this.addEventListener('rl-change', this.handleRlChange as EventListener);
    window.addEventListener('rin-docs-route-change', this.handleRouteChange as EventListener);
    queueMicrotask(() => this.syncControls());
  }

  disconnectedCallback() {
    this.removeEventListener('click', this.handleClick);
    this.removeEventListener('rl-click', this.handleRlClick as EventListener);
    this.removeEventListener('rl-change', this.handleRlChange as EventListener);
    window.removeEventListener('rin-docs-route-change', this.handleRouteChange as EventListener);
  }

  private get themeElement() {
    return this.querySelector('rl-theme') as HTMLElement & {
      theme: 'light' | 'dark';
      accent: string;
      density: 'comfortable' | 'compact';
      motion: 'normal' | 'reduced';
      stylePreset: 'default' | 'illustration';
    };
  }

  private get drawerElement() {
    return this.querySelector('rl-drawer') as HTMLElement & { open: boolean };
  }

  private handleRouteChange = () => {
    requestAnimationFrame(() => this.syncControls());
  };

  private handleClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    const accentButton = target.closest<HTMLButtonElement>('[data-accent]');
    if (accentButton) {
      this.themeElement.accent = accentButton.dataset.accent ?? '#3b82f6';
      this.syncControls();
    }
  };

  private handleRlClick = (event: CustomEvent) => {
    const target = event.target as HTMLElement;
    if (target.id === 'docs-open-theme') this.drawerElement.open = true;
    if (target.id === 'docs-toggle-theme') {
      this.themeElement.theme = this.themeElement.theme === 'dark' ? 'light' : 'dark';
      this.syncControls();
    }
    if (target.id === 'docs-show-toast') {
      RlToast.show({ message: 'Rin UI routes, tokens, and components are active.', variant: 'success' });
    }
  };

  private handleRlChange = (event: CustomEvent<Record<string, unknown>>) => {
    const target = event.target as HTMLElement;
    if (target.matches('[data-theme-mode]')) {
      this.themeElement.theme = (event.detail.value as 'light' | 'dark') ?? 'light';
    }
    if (target.matches('[data-style-toggle]')) {
      this.themeElement.stylePreset = event.detail.selected ? 'illustration' : 'default';
    }
    if (target.matches('[data-density-toggle]')) {
      this.themeElement.density = event.detail.selected ? 'compact' : 'comfortable';
    }
    if (target.matches('[data-motion-toggle]')) {
      this.themeElement.motion = event.detail.checked ? 'reduced' : 'normal';
    }
    this.syncControls();
  };

  private syncControls() {
    const theme = this.themeElement;
    if (!theme) return;

    this.querySelectorAll<HTMLElement>('[data-theme-mode]').forEach((control) => {
      (control as HTMLElement & { value: string }).value = theme.theme;
    });
    this.querySelectorAll<HTMLElement>('[data-style-toggle]').forEach((control) => {
      (control as HTMLElement & { selected: boolean }).selected = theme.stylePreset === 'illustration';
    });
    this.querySelectorAll<HTMLElement>('[data-density-toggle]').forEach((control) => {
      (control as HTMLElement & { selected: boolean }).selected = theme.density === 'compact';
    });
    this.querySelectorAll<HTMLElement>('[data-motion-toggle]').forEach((control) => {
      (control as HTMLElement & { checked: boolean }).checked = theme.motion === 'reduced';
    });
  }

  private render() {
    this.innerHTML = `
      <rl-theme id="docs-theme" theme="light" density="comfortable" motion="normal" style-preset="default" accent="#3b82f6">
        <rl-app-shell>
          <rin-docs-nav slot="rail" placement="rail"></rin-docs-nav>
          <div slot="top" class="mobile-bar">
            <strong>Rin UI</strong>
            <rl-icon-button id="docs-toggle-theme" label="Toggle theme"><span slot="icon">T</span></rl-icon-button>
          </div>
          <rin-docs-nav slot="bottom" placement="bottom"></rin-docs-nav>
          <main class="docs-page"><rin-docs-router></rin-docs-router></main>
        </rl-app-shell>
        <rl-drawer id="docs-theme-drawer" placement="right">
          <h2 slot="label">Theme controls</h2>
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
        </rl-drawer>
      </rl-theme>
    `;
  }
}

customElements.define('rin-docs-app', RinDocsApp);
