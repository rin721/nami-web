import { html, LitElement } from 'lit';
import type { LocaleStatusEventDetail } from '@lit/localize';
import { emit } from '../internal/events';
import { componentHostStyles } from '../internal/styles';
import { getLocale, normalizeLocale, setLocale, type NamiLocaleCode } from '../localize';

export type NamiTextDirection = 'ltr' | 'rtl' | 'auto';

export interface NamiLocaleChangeDetail {
  value: NamiLocaleCode;
  locale: NamiLocaleCode;
  dir: NamiTextDirection;
}

export type NamiConfigLocaleStatusEventDetail = LocaleStatusEventDetail;

export class NamiConfig extends LitElement {
  static properties = {
    locale: { reflect: true },
    dir: { reflect: true }
  };

  static styles = [componentHostStyles];

  declare locale: NamiLocaleCode;
  declare dir: NamiTextDirection;

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
    emit(this, 'nami-locale-status', event.detail);
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
    emit<NamiLocaleChangeDetail>(this, 'nami-change', { value: normalized, locale: normalized, dir: this.dir });
  }

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'nami-config': NamiConfig;
  }
}
