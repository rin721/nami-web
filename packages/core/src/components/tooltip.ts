import { css, html, LitElement, nothing } from 'lit';
import { isEscapeKey, overlayCloseDetail, overlayState, resolveOverlayPlacement, type NamiOverlayPlacement } from '../foundation/overlay';
import { nextId } from '../foundation/ids';
import { syncHostState } from '../foundation/selection';
import { emit } from '../internal/events';
import { componentHostStyles } from '../internal/styles';

export class NamiTooltip extends LitElement {
  static properties = {
    open: { type: Boolean, reflect: true },
    placement: { reflect: true },
    disabled: { type: Boolean, reflect: true }
  };

  static styles = [
    componentHostStyles,
    css`
      :host {
        display: inline-block;
        position: relative;
      }

      .trigger {
        display: contents;
      }

      .content {
        background: var(--nami-tooltip-bg, var(--nami-text));
        border: var(--nami-tooltip-border-width, 0) solid var(--nami-tooltip-border-color, transparent);
        border-radius: var(--nami-tooltip-radius, var(--nami-radius-tight, 4px));
        box-shadow: var(--nami-tooltip-shadow, 0 8px 24px color-mix(in oklab, var(--nami-shadow-color, #000), transparent 72%));
        color: var(--nami-tooltip-fg, var(--nami-text-inverse));
        font-size: var(--nami-tooltip-font-size, 0.75rem);
        inset: auto auto auto 50%;
        line-height: 1.35;
        max-inline-size: min(240px, calc(100vw - 32px));
        padding: var(--nami-tooltip-padding-y, 6px) var(--nami-tooltip-padding-x, 8px);
        pointer-events: none;
        position: absolute;
        white-space: normal;
        width: max-content;
        z-index: var(--nami-tooltip-z-index, 80);
      }

      .content[hidden] {
        display: none;
      }

      .content[data-placement='top'] {
        bottom: calc(100% + var(--nami-tooltip-offset, 8px));
        left: 50%;
        transform: translateX(-50%);
      }

      .content[data-placement='bottom'] {
        left: 50%;
        top: calc(100% + var(--nami-tooltip-offset, 8px));
        transform: translateX(-50%);
      }

      .content[data-placement='left'] {
        right: calc(100% + var(--nami-tooltip-offset, 8px));
        top: 50%;
        transform: translateY(-50%);
      }

      .content[data-placement='right'] {
        left: calc(100% + var(--nami-tooltip-offset, 8px));
        top: 50%;
        transform: translateY(-50%);
      }
    `
  ];

  declare open: boolean;
  declare placement: NamiOverlayPlacement;
  declare disabled: boolean;

  private contentId = nextId('nami-tooltip');
  private closeSourceEvent: Event | undefined;
  private triggerElements = new Set<HTMLElement>();

  constructor() {
    super();
    this.open = false;
    this.placement = 'top';
    this.disabled = false;
  }

  disconnectedCallback() {
    this.unsyncTriggers();
    super.disconnectedCallback();
  }

  updated(changed: Map<string, unknown>) {
    const visible = this.open && !this.disabled;
    const placement = this.resolvedPlacement;
    syncHostState(this, {
      state: overlayState(visible),
      disabled: this.disabled
    });
    this.dataset.placement = placement;
    this.syncTriggerDescriptions();

    if (this.disabled && this.open) {
      this.close();
      return;
    }

    if (!changed.has('open') || changed.get('open') === undefined) return;
    if (this.open) {
      emit(this, 'nami-open', undefined);
    } else if (changed.get('open') === true) {
      emit(this, 'nami-close', overlayCloseDetail(this.closeSourceEvent));
      this.closeSourceEvent = undefined;
    }
  }

  private get resolvedPlacement() {
    const dir = getComputedStyle(this).direction === 'rtl' ? 'rtl' : 'ltr';
    return resolveOverlayPlacement(this.placement, dir);
  }

  private openTooltip(event: Event) {
    if (this.disabled || this.open) return;
    this.open = true;
    this.closeSourceEvent = undefined;
    event.stopPropagation();
  }

  private close(event?: Event) {
    if (!this.open) return;
    this.closeSourceEvent = event;
    this.open = false;
  }

  private handleTriggerOpen = (event: Event) => {
    this.openTooltip(event);
  };

  private handleTriggerClose = (event: Event) => {
    this.close(event);
  };

  private handleTriggerKeydown = (event: KeyboardEvent) => {
    if (isEscapeKey(event) && this.open) {
      event.stopPropagation();
      this.close(event);
    }
  };

  private handleTriggerSlotChange(event: Event) {
    const slot = event.target as HTMLSlotElement;
    this.unsyncTriggers();
    const elements = slot.assignedElements({ flatten: true }).filter((element): element is HTMLElement => element instanceof HTMLElement);
    this.triggerElements = new Set(elements);
    for (const element of this.triggerElements) {
      element.addEventListener('mouseenter', this.handleTriggerOpen);
      element.addEventListener('mouseleave', this.handleTriggerClose);
      element.addEventListener('focusin', this.handleTriggerOpen);
      element.addEventListener('focusout', this.handleTriggerClose);
      element.addEventListener('keydown', this.handleTriggerKeydown);
    }
    this.syncTriggerDescriptions();
  }

  private syncTriggerDescriptions() {
    for (const element of this.triggerElements) {
      if (this.disabled) {
        element.removeAttribute('aria-describedby');
      } else {
        element.setAttribute('aria-describedby', this.contentId);
      }
    }
  }

  private unsyncTriggers() {
    for (const element of this.triggerElements) {
      element.removeEventListener('mouseenter', this.handleTriggerOpen);
      element.removeEventListener('mouseleave', this.handleTriggerClose);
      element.removeEventListener('focusin', this.handleTriggerOpen);
      element.removeEventListener('focusout', this.handleTriggerClose);
      element.removeEventListener('keydown', this.handleTriggerKeydown);
      element.removeAttribute('aria-describedby');
    }
    this.triggerElements.clear();
  }

  render() {
    const visible = this.open && !this.disabled;
    const placement = this.resolvedPlacement;

    return html`
      <span class="trigger" part="trigger"><slot name="trigger" @slotchange=${this.handleTriggerSlotChange}></slot></span>
      <span
        id=${this.contentId}
        class="content"
        part="base content"
        role="tooltip"
        data-placement=${placement}
        aria-hidden=${visible ? 'false' : 'true'}
        ?hidden=${!visible}
      >
        <slot name="content">${nothing}</slot>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'nami-tooltip': NamiTooltip;
  }
}
