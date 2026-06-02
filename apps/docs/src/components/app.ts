import { RlToast } from '@rin-labs/ui';
import type { RlLocaleCode } from '@rin-labs/ui/localize';
import { currentLocale, currentPath, navigate } from '../routes';
import { docsLocales, t } from '../i18n';

export class RinDocsApp extends HTMLElement {
  private visualState = {
    theme: 'light' as 'light' | 'dark',
    accent: '#3b82f6',
    density: 'comfortable' as 'comfortable' | 'compact',
    motion: 'normal' as 'normal' | 'reduced',
    stylePreset: 'default' as 'default' | 'illustration'
  };

  connectedCallback() {
    this.render();
    this.addEventListener('click', this.handleClick);
    this.addEventListener('rl-click', this.handleRlClick as EventListener);
    this.addEventListener('rl-change', this.handleRlChange as EventListener);
    window.addEventListener('rin-docs-route-change', this.handleRouteChange as EventListener);
    window.addEventListener('lit-localize-status', this.handleLocaleStatus as EventListener);
    queueMicrotask(() => this.syncControls());
  }

  disconnectedCallback() {
    this.removeEventListener('click', this.handleClick);
    this.removeEventListener('rl-click', this.handleRlClick as EventListener);
    this.removeEventListener('rl-change', this.handleRlChange as EventListener);
    window.removeEventListener('rin-docs-route-change', this.handleRouteChange as EventListener);
    window.removeEventListener('lit-localize-status', this.handleLocaleStatus as EventListener);
  }

  private get configElement() {
    return this.querySelector('rl-config') as HTMLElement & {
      locale: RlLocaleCode;
      dir: 'ltr' | 'rtl' | 'auto';
    };
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

  private handleRouteChange = (event?: CustomEvent<{ locale: RlLocaleCode }>) => {
    const locale = event?.detail?.locale ?? currentLocale();
    if (this.configElement && this.configElement.locale !== locale) this.configElement.locale = locale;
    document.documentElement.lang = locale;
    document.documentElement.dir = this.configElement?.dir ?? 'ltr';
    requestAnimationFrame(() => this.syncControls());
  };

  private handleLocaleStatus = (event: CustomEvent<{ status: string }>) => {
    if (event.detail.status === 'ready') {
      this.render();
      requestAnimationFrame(() => this.syncControls());
    }
  };

  private handleClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    const accentButton = target.closest<HTMLButtonElement>('[data-accent]');
    if (accentButton) {
      this.visualState.accent = accentButton.dataset.accent ?? '#3b82f6';
      this.applyVisualState();
      this.syncControls();
    }
  };

  private handleRlClick = (event: CustomEvent) => {
    const target = event.target as HTMLElement;
    if (target.id === 'docs-open-theme') this.drawerElement.open = true;
    if (target.id === 'docs-toggle-theme') {
      this.visualState.theme = this.visualState.theme === 'dark' ? 'light' : 'dark';
      this.applyVisualState();
      this.syncControls();
    }
    if (target.id === 'docs-show-toast') {
      RlToast.show({ message: t('Rin UI routes, tokens, and components are active.', 'docs.toast.ready'), variant: 'success' });
    }
  };

  private handleRlChange = (event: CustomEvent<Record<string, unknown>>) => {
    const target = event.target as HTMLElement;
    if (target.matches('[data-theme-mode]')) {
      this.visualState.theme = (event.detail.value as 'light' | 'dark') ?? 'light';
    }
    if (target.matches('[data-locale-mode]')) {
      navigate(currentPath(), (event.detail.value as RlLocaleCode) ?? currentLocale());
      return;
    }
    if (target.matches('[data-style-toggle]')) {
      this.visualState.stylePreset = event.detail.selected ? 'illustration' : 'default';
    }
    if (target.matches('[data-density-toggle]')) {
      this.visualState.density = event.detail.selected ? 'compact' : 'comfortable';
    }
    if (target.matches('[data-motion-toggle]')) {
      this.visualState.motion = event.detail.checked ? 'reduced' : 'normal';
    }
    this.applyVisualState();
    this.syncControls();
  };

  private applyVisualState() {
    const theme = this.themeElement;
    if (!theme) return;
    theme.theme = this.visualState.theme;
    theme.accent = this.visualState.accent;
    theme.density = this.visualState.density;
    theme.motion = this.visualState.motion;
    theme.stylePreset = this.visualState.stylePreset;
  }

  private syncControls() {
    this.querySelectorAll<HTMLElement>('[data-theme-mode]').forEach((control) => {
      (control as HTMLElement & { value: string }).value = this.visualState.theme;
    });
    this.querySelectorAll<HTMLElement>('[data-style-toggle]').forEach((control) => {
      (control as HTMLElement & { selected: boolean }).selected = this.visualState.stylePreset === 'illustration';
    });
    this.querySelectorAll<HTMLElement>('[data-density-toggle]').forEach((control) => {
      (control as HTMLElement & { selected: boolean }).selected = this.visualState.density === 'compact';
    });
    this.querySelectorAll<HTMLElement>('[data-motion-toggle]').forEach((control) => {
      (control as HTMLElement & { checked: boolean }).checked = this.visualState.motion === 'reduced';
    });
    this.querySelectorAll<HTMLElement>('[data-locale-mode]').forEach((control) => {
      (control as HTMLElement & { value: string }).value = currentLocale();
    });
  }

  private render() {
    const locale = currentLocale();
    this.innerHTML = `
      <rl-config id="docs-config" locale="${locale}" dir="ltr">
        <rl-theme id="docs-theme" theme="${this.visualState.theme}" density="${this.visualState.density}" motion="${this.visualState.motion}" style-preset="${this.visualState.stylePreset}" accent="${this.visualState.accent}">
          <rl-app-shell>
            <rin-docs-nav slot="rail" placement="rail"></rin-docs-nav>
            <div slot="top" class="mobile-bar">
              <strong>Rin UI</strong>
              <rl-icon-button id="docs-toggle-theme" label="${t('Toggle theme', 'docs.mobile.toggleTheme')}"><span slot="icon">T</span></rl-icon-button>
            </div>
            <rin-docs-nav slot="bottom" placement="bottom"></rin-docs-nav>
            <main class="docs-page"><rin-docs-router></rin-docs-router></main>
          </rl-app-shell>
          <rl-drawer id="docs-theme-drawer" placement="right">
            <h2 slot="label">${t('Theme controls', 'docs.drawer.title')}</h2>
            <div class="control-stack">
              <rl-tab-bar data-locale-mode value="${locale}">
                ${docsLocales.map((item) => `<button value="${item}">${item === 'zh-CN' ? '中文' : 'English'}</button>`).join('')}
              </rl-tab-bar>
              <rl-tab-bar data-theme-mode value="light">
                <button value="light">${t('Light', 'docs.controls.light')}</button>
                <button value="dark">${t('Dark', 'docs.controls.dark')}</button>
              </rl-tab-bar>
              <div class="swatches" aria-label="${t('Accent color', 'docs.controls.accent')}">
                <button data-accent="#3b82f6" style="--swatch: #3b82f6">${t('Blue', 'docs.controls.blue')}</button>
                <button data-accent="#14b8a6" style="--swatch: #14b8a6">${t('Teal', 'docs.controls.teal')}</button>
                <button data-accent="#8b5cf6" style="--swatch: #8b5cf6">${t('Violet', 'docs.controls.violet')}</button>
              </div>
              <rl-chip data-density-toggle checkbox value="compact">${t('Compact density', 'docs.controls.compact')}</rl-chip>
              <rl-switch data-motion-toggle>${t('Reduced motion', 'docs.controls.reducedMotion')}</rl-switch>
              <rl-chip data-style-toggle checkbox value="illustration">${t('Illustration style', 'docs.controls.illustration')}</rl-chip>
            </div>
          </rl-drawer>
        </rl-theme>
      </rl-config>
    `;
    this.handleRouteChange();
  }
}

customElements.define('rin-docs-app', RinDocsApp);
