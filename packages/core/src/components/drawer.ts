import { css, html, LitElement } from 'lit';
import { restoreFocus } from '../foundation/focus';
import { emit } from '../internal/events';
import { componentHostStyles } from '../internal/styles';

export class RlDrawer extends LitElement {
  static properties = {
    open: { type: Boolean, reflect: true },
    placement: { reflect: true }
  };

  static styles = [
    componentHostStyles,
    css`
      :host {
        display: contents;
      }

      .backdrop {
        background: color-mix(in oklab, #000, transparent 55%);
        backdrop-filter: blur(8px);
        inset: 0;
        opacity: 0;
        pointer-events: none;
        position: fixed;
        transition: opacity var(--rl-motion-exit, 150ms) var(--rl-ease-standard, ease);
        z-index: 50;
      }

      .panel {
        background: var(--rl-drawer-bg, var(--rl-surface-overlay));
        border: var(--rl-drawer-border-width, var(--rl-style-stroke-width, 1px)) solid var(--rl-drawer-border-color, var(--rl-border));
        box-shadow: var(--rl-drawer-shadow);
        color: var(--rl-text);
        max-height: 100dvh;
        max-width: 100dvw;
        overflow: auto;
        padding: var(--rl-space-5, 24px);
        pointer-events: none;
        position: fixed;
        transition: transform var(--rl-motion-slow, 700ms) var(--rl-ease-emphasized, ease);
        visibility: hidden;
        z-index: 51;
      }

      :host([placement='left']) .panel {
        border-radius: 0 var(--rl-radius-surface, 6px) var(--rl-radius-surface, 6px) 0;
        bottom: 0;
        left: 0;
        top: 0;
        transform: translateX(-105%);
        width: min(320px, calc(100vw - 48px));
      }

      :host([placement='right']) .panel {
        border-radius: var(--rl-radius-surface, 6px) 0 0 var(--rl-radius-surface, 6px);
        bottom: 0;
        right: 0;
        top: 0;
        transform: translateX(105%);
        width: min(320px, calc(100vw - 48px));
      }

      :host([placement='bottom']) .panel {
        border-radius: var(--rl-radius-surface, 6px) var(--rl-radius-surface, 6px) 0 0;
        bottom: 0;
        left: 0;
        right: 0;
        transform: translateY(105%);
      }

      :host([open]) .backdrop {
        opacity: 1;
        pointer-events: auto;
        transition-duration: var(--rl-motion-normal, 250ms);
      }

      :host([open]) .panel {
        pointer-events: auto;
        transform: translate(0);
        visibility: visible;
      }

      @media (prefers-reduced-motion: reduce) {
        .backdrop,
        .panel {
          transition-duration: 1ms;
        }
      }
    `
  ];

  declare open: boolean;
  declare placement: 'left' | 'right' | 'bottom';

  private previousActiveElement: Element | null = null;
  private closeSourceEvent: Event | undefined;

  constructor() {
    super();
    this.open = false;
    this.placement = 'left';
  }

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('keydown', this.handleKeydown);
  }

  disconnectedCallback() {
    document.removeEventListener('keydown', this.handleKeydown);
    super.disconnectedCallback();
  }

  private handleKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && this.open) this.close(event);
  };

  private close(sourceEvent?: Event) {
    if (!this.open) return;
    this.closeSourceEvent = sourceEvent;
    this.open = false;
  }

  updated(changed: Map<string, unknown>) {
    if (!changed.has('open')) return;
    const wasOpen = changed.get('open') === true;

    if (this.open) {
      this.previousActiveElement = document.activeElement;
      requestAnimationFrame(() => this.panelElement?.focus());
      emit(this, 'rl-open', undefined);
    } else if (wasOpen) {
      this.restoreFocus();
      emit(this, 'rl-close', this.closeSourceEvent ? { sourceEvent: this.closeSourceEvent } : undefined);
      this.closeSourceEvent = undefined;
    }
  }

  private get panelElement() {
    return this.renderRoot.querySelector('.panel') as HTMLElement | null;
  }

  private restoreFocus() {
    restoreFocus(this.previousActiveElement);
    this.previousActiveElement = null;
  }

  render() {
    return html`
      <div class="backdrop" part="backdrop" @click=${(event: MouseEvent) => this.close(event)}></div>
      <aside
        class="panel"
        part="base control"
        role="dialog"
        aria-modal=${this.open ? 'true' : 'false'}
        aria-hidden=${this.open ? 'false' : 'true'}
        tabindex=${this.open ? '0' : '-1'}
        ?inert=${!this.open}
      >
        <slot name="label" part="label"></slot>
        <slot></slot>
        <slot name="actions"></slot>
      </aside>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rl-drawer': RlDrawer;
  }
}
