import { css, html, LitElement, nothing } from 'lit';
import { getFocusableElements, trapFocus } from '../foundation/focus';
import { captureOverlayFocus, isBackdropEvent, overlayCloseDetail, overlayState, restoreOverlayFocus } from '../foundation/overlay';
import { emit } from '../internal/events';
import { componentHostStyles } from '../internal/styles';

export class NamiDialog extends LitElement {
  static properties = {
    open: { type: Boolean, reflect: true },
    label: {},
    closeOnBackdrop: { attribute: 'close-on-backdrop', type: Boolean, reflect: true }
  };

  static styles = [
    componentHostStyles,
    css`
      dialog {
        background: var(--nami-dialog-bg, var(--nami-surface-raised));
        border: var(--nami-dialog-border-width, var(--nami-style-stroke-width, 1px)) solid var(--nami-dialog-border-color, var(--nami-border));
        border-radius: var(--nami-dialog-radius, var(--nami-radius-surface, 6px));
        box-shadow: var(--nami-dialog-shadow);
        color: var(--nami-style-on-paper, var(--nami-text));
        margin: auto;
        max-width: min(560px, calc(100vw - 32px));
        min-width: min(420px, calc(100vw - 32px));
        padding: 0;
        transition:
          opacity var(--nami-motion-normal, 250ms) var(--nami-ease-standard, ease),
          transform var(--nami-motion-normal, 250ms) var(--nami-ease-standard, ease);
      }

      dialog::backdrop {
        background: var(--nami-overlay-backdrop, color-mix(in oklab, #000, transparent 52%));
        backdrop-filter: blur(8px);
      }

      .panel {
        display: grid;
        gap: var(--nami-space-4, 16px);
        padding: var(--nami-space-5, 24px);
      }

      header {
        align-items: center;
        display: flex;
        justify-content: space-between;
      }

      h2 {
        font-size: 1.125rem;
        line-height: 1.3;
        margin: 0;
      }

      .close {
        background: transparent;
        border: 0;
        border-radius: var(--nami-radius-control, 999px);
        color: var(--nami-style-on-paper-muted, var(--nami-icon-color));
        cursor: pointer;
        height: 36px;
        width: 36px;
      }

      .close:hover {
        background: var(--nami-hover-overlay);
      }

      .close:focus-visible {
        box-shadow: var(--nami-style-focus-shadow, var(--nami-focus-ring));
        outline: none;
      }

      footer {
        display: flex;
        gap: var(--nami-space-2, 6px);
        justify-content: flex-end;
      }
    `
  ];

  declare open: boolean;
  declare label: string;
  declare closeOnBackdrop: boolean;

  private previousActiveElement: Element | null = null;
  private closeSourceEvent: Event | undefined;

  constructor() {
    super();
    this.open = false;
    this.label = '';
    this.closeOnBackdrop = true;
  }

  private get dialogElement() {
    return this.renderRoot.querySelector('dialog') as HTMLDialogElement;
  }

  private get focusableElements() {
    return getFocusableElements(this.dialogElement);
  }

  updated(changed: Map<string, unknown>) {
    this.dataset.state = overlayState(this.open);
    if (!changed.has('open')) return;
    const wasOpen = changed.get('open') === true;

    if (this.open && !this.dialogElement.open) {
      this.previousActiveElement = captureOverlayFocus();
      this.dialogElement.showModal();
      requestAnimationFrame(() => this.focusInitialElement());
      emit(this, 'nami-open', undefined);
    }

    if (!this.open && this.dialogElement.open) {
      this.dialogElement.close();
    }

    if (!this.open && wasOpen) {
      this.restoreFocus();
      emit(this, 'nami-close', overlayCloseDetail(this.closeSourceEvent));
      this.closeSourceEvent = undefined;
    }
  }

  private focusInitialElement() {
    const firstFocusable = this.focusableElements[0];
    firstFocusable?.focus();
  }

  private restoreFocus() {
    restoreOverlayFocus(this.previousActiveElement);
    this.previousActiveElement = null;
  }

  private close(sourceEvent?: Event) {
    if (!this.open) return;
    this.closeSourceEvent = sourceEvent;
    this.open = false;
  }

  private handleCancel(event: Event) {
    event.preventDefault();
    this.close(event);
  }

  private handleClick(event: MouseEvent) {
    if (!this.closeOnBackdrop) return;
    if (isBackdropEvent(event, this.dialogElement)) this.close(event);
  }

  private handleNativeClose() {
    if (this.open) this.close();
  }

  private handleKeydown(event: KeyboardEvent) {
    if (this.open) trapFocus(event, this.dialogElement);
  }

  render() {
    return html`
      <dialog
        part="base"
        aria-label=${this.label || nothing}
        @cancel=${this.handleCancel}
        @click=${this.handleClick}
        @close=${this.handleNativeClose}
        @keydown=${this.handleKeydown}
      >
        <div class="panel" part="control">
          <header part="header">
            <h2 part="label"><slot name="label">${this.label}</slot></h2>
            <button class="close" type="button" aria-label="Close" part="actions" @click=${(event: MouseEvent) => this.close(event)}>X</button>
          </header>
          <section part="description"><slot></slot></section>
          <footer part="footer"><slot name="actions"></slot></footer>
        </div>
      </dialog>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'nami-dialog': NamiDialog;
  }
}
