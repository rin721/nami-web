import { html, LitElement } from 'lit';
import type { LocaleStatusEventDetail } from '@lit/localize';
import { emit } from '../internal/events';
import { componentHostStyles } from '../internal/styles';
import { getLocale, normalizeLocale, setLocale, type RlLocaleCode } from '../localize';

export type RlTextDirection = 'ltr' | 'rtl' | 'auto';

export interface RlLocaleChangeDetail {
  value: RlLocaleCode;
  locale: RlLocaleCode;
  dir: RlTextDirection;
}

export type RlConfigLocaleStatusEventDetail = LocaleStatusEventDetail;

export class RlConfig extends LitElement {
  static properties = {
    locale: { reflect: true },
    dir: { reflect: true }
  };

  static styles = [componentHostStyles];

  declare locale: RlLocaleCode;
  declare dir: RlTextDirection;

  private lastAppliedLocale = '';

  constructor() {
    super();
    this.locale = 'en-US';
    this.dir = 'ltr';
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('lit-localize-status', this.handleLocaleStatus as EventListener);
    this.applyDirection();
    void this.applyLocale();
  }

  disconnectedCallback() {
    window.removeEventListener('lit-localize-status', this.handleLocaleStatus as EventListener);
    super.disconnectedCallback();
  }

  updated(changed: Map<string, unknown>) {
    if (changed.has('locale')) this.applyLocale();
    if (changed.has('dir')) this.applyDirection();
  }

  private handleLocaleStatus = (event: CustomEvent<LocaleStatusEventDetail>) => {
    emit(this, 'rl-locale-status', event.detail);
  };

  private applyDirection() {
    this.setAttribute('dir', this.dir);
  }

  private async applyLocale() {
    const normalized = normalizeLocale(this.locale);
    if (normalized !== this.locale) {
      this.locale = normalized;
      return;
    }

    this.applyDirection();
    if (this.lastAppliedLocale === normalized && getLocale() === normalized) return;
    this.lastAppliedLocale = normalized;
    if (getLocale() !== normalized) {
      await setLocale(normalized);
    }
    emit<RlLocaleChangeDetail>(this, 'rl-change', { value: normalized, locale: normalized, dir: this.dir });
  }

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rl-config': RlConfig;
  }
}
