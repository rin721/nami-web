import { css, html, LitElement } from 'lit';
import { getNextRovingIndex, getRovingValue } from '../foundation/roving-tabindex';
import { emit } from '../internal/events';
import { componentHostStyles } from '../internal/styles';

export class NamiTabBar extends LitElement {
  static properties = {
    value: {},
    orientation: { reflect: true }
  };

  static styles = [
    componentHostStyles,
    css`
      :host {
        display: block;
      }

      .base {
        align-items: center;
        display: flex;
        gap: var(--nami-space-1, 4px);
      }

      :host([orientation='vertical']) .base {
        align-items: stretch;
        flex-direction: column;
      }

      ::slotted(*) {
        background: var(--nami-tab-bg, transparent);
        border: var(--nami-tab-border-width, 0) solid var(--nami-tab-border-color, transparent);
        border-radius: var(--nami-tab-radius, var(--nami-radius-control, 999px));
        color: var(--nami-style-on-paper, var(--nami-icon-color));
        cursor: pointer;
        min-height: var(--nami-control-height-md, 40px);
        padding: 0 14px;
        transition:
          background-color var(--nami-motion-normal, 250ms) var(--nami-ease-standard, ease),
          color var(--nami-motion-fast, 120ms) var(--nami-ease-standard, ease);
      }

      ::slotted([aria-selected='true']) {
        background: var(--nami-accent-hover-overlay);
        color: var(--nami-color-primary);
      }
    `
  ];

  declare value: string;
  declare orientation: 'horizontal' | 'vertical';

  constructor() {
    super();
    this.value = '';
    this.orientation = 'horizontal';
  }

  private get items() {
    const slot = this.renderRoot.querySelector('slot');
    return (slot?.assignedElements({ flatten: true }) ?? []) as HTMLElement[];
  }

  private get enabledItems() {
    return this.items.filter((item) => !this.isItemDisabled(item));
  }

  firstUpdated() {
    this.syncItems();
  }

  updated() {
    this.syncItems();
  }

  private syncItems() {
    const enabledItems = this.enabledItems;
    if (enabledItems.length === 0) {
      if (this.items.length === 0 && this.value !== '') this.value = '';
      this.items.forEach((item) => {
        item.setAttribute('role', 'tab');
        item.setAttribute('aria-disabled', this.isItemDisabled(item) ? 'true' : 'false');
        item.setAttribute('tabindex', '-1');
      });
      return;
    }
    const hasEnabledValue = enabledItems.some((item) => getRovingValue(item) === this.value);
    const activeValue = hasEnabledValue ? this.value : getRovingValue(enabledItems[0]) || '';
    if (this.value !== activeValue) this.value = activeValue;

    this.items.forEach((item) => {
      const itemValue = getRovingValue(item);
      const disabled = this.isItemDisabled(item);
      const selected = !disabled && itemValue === activeValue;
      item.setAttribute('role', 'tab');
      item.setAttribute('aria-selected', String(selected));
      if (disabled) {
        item.setAttribute('aria-disabled', 'true');
      } else {
        item.removeAttribute('aria-disabled');
      }
      item.setAttribute('tabindex', selected ? '0' : '-1');
      item.removeEventListener('click', this.handleItemClick);
      item.removeEventListener('keydown', this.handleItemKeydown);
      item.addEventListener('click', this.handleItemClick);
      item.addEventListener('keydown', this.handleItemKeydown);
    });
  }

  private handleItemClick = (event: Event) => {
    const item = event.currentTarget as HTMLElement;
    if (this.isItemDisabled(item)) return;
    this.selectItem(item, event);
  };

  private handleItemKeydown = (event: KeyboardEvent) => {
    if (!['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const current = event.currentTarget as HTMLElement;
    const enabledItems = this.enabledItems;
    const index = enabledItems.indexOf(current);
    if (index < 0 || enabledItems.length === 0) return;
    const next = getNextRovingIndex(event.key, index, enabledItems.length, this.orientation);
    const item = enabledItems[next];
    item?.focus();
    if (item) this.selectItem(item, event);
  };

  private isItemDisabled(item: HTMLElement) {
    return item.hasAttribute('disabled') || item.getAttribute('aria-disabled') === 'true' || Boolean((item as HTMLButtonElement).disabled);
  }

  private selectItem(item: HTMLElement, sourceEvent: Event) {
    const value = getRovingValue(item);
    if (!value || value === this.value) return;
    this.value = value;
    this.syncItems();
    emit(this, 'nami-select', { value, sourceEvent });
    emit(this, 'nami-change', { value, sourceEvent });
  }

  render() {
    return html`
      <div class="base" part="base" role="tablist" aria-orientation=${this.orientation}>
        <slot @slotchange=${() => this.syncItems()}></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'nami-tab-bar': NamiTabBar;
  }
}
