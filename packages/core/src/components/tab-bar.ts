import { css, html, LitElement } from 'lit';
import { getNextRovingIndex, getRovingValue, syncRovingItems } from '../foundation/roving-tabindex';
import { emit } from '../internal/events';
import { componentHostStyles } from '../internal/styles';

export class RlTabBar extends LitElement {
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
        gap: var(--rl-space-1, 4px);
      }

      :host([orientation='vertical']) .base {
        align-items: stretch;
        flex-direction: column;
      }

      ::slotted(*) {
        background: var(--rl-tab-bg, transparent);
        border: var(--rl-tab-border-width, 0) solid var(--rl-tab-border-color, transparent);
        border-radius: var(--rl-tab-radius, var(--rl-radius-control, 999px));
        color: var(--rl-icon-color);
        cursor: pointer;
        min-height: var(--rl-control-height-md, 40px);
        padding: 0 14px;
        transition:
          background-color var(--rl-motion-normal, 250ms) var(--rl-ease-standard, ease),
          color var(--rl-motion-fast, 120ms) var(--rl-ease-standard, ease);
      }

      ::slotted([aria-selected='true']) {
        background: var(--rl-accent-hover-overlay);
        color: var(--rl-color-primary);
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

  firstUpdated() {
    this.syncItems();
  }

  updated() {
    this.syncItems();
  }

  private syncItems() {
    const activeValue = this.value || getRovingValue(this.items[0]) || '';
    if (!this.value && activeValue) this.value = activeValue;
    this.items.forEach((item) => {
      const itemValue = getRovingValue(item);
      const selected = itemValue === activeValue;
      item.setAttribute('role', 'tab');
      item.setAttribute('aria-selected', String(selected));
      item.removeEventListener('click', this.handleItemClick);
      item.removeEventListener('keydown', this.handleItemKeydown);
      item.addEventListener('click', this.handleItemClick);
      item.addEventListener('keydown', this.handleItemKeydown);
    });
    syncRovingItems(this.items, activeValue);
  }

  private handleItemClick = (event: Event) => {
    const item = event.currentTarget as HTMLElement;
    this.selectItem(item, event);
  };

  private handleItemKeydown = (event: KeyboardEvent) => {
    if (!['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const current = event.currentTarget as HTMLElement;
    const index = this.items.indexOf(current);
    const next = getNextRovingIndex(event.key, index, this.items.length, this.orientation);
    const item = this.items[next];
    item?.focus();
    if (item) this.selectItem(item, event);
  };

  private selectItem(item: HTMLElement, sourceEvent: Event) {
    const value = getRovingValue(item);
    if (!value || value === this.value) return;
    this.value = value;
    this.syncItems();
    emit(this, 'rl-select', { value, sourceEvent });
    emit(this, 'rl-change', { value, sourceEvent });
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
    'rl-tab-bar': RlTabBar;
  }
}
