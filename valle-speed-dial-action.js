import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@valle/valle-fab/valle-fab.js';

export default class ValleSpeedDialAction extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: inline-block;
          position: relative;
        }

        .mini-fab {
          --valle-fab-color: var(--valle-speed-dial-action-fab-color, #00b0ba);
          --valle-fab-default-icon-color: var(--valle-speed-dial-action-default-icon-color, #ffffff);
        }

        .label {
          box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
                      0 1px 5px 0 rgba(0, 0, 0, 0.12),
                      0 3px 1px -2px rgba(0, 0, 0, 0.2);
          padding: 6px 10px;
          background-color: var(--valle-speed-dial-action-label-bg-color, #f5f5f5);
          color: var(--valle-speed-dial-action-label-text-color, #000000);
          position: absolute;
          top: 14px;
          display: none;
          white-space: nowrap;
          /* @apply --valle-speed-dial-action-label; */
        }

        :host([label-direction="left"]) .label {
          display: inline-block;
          right: 58px;
        }

        :host([label-direction="right"]) .label {
          display: inline-block;
          right: -58px;
        }
      </style>

      <span class="label">[[label]]</span>

      <valle-fab mini label=[[label]] icon=[[icon]] class="mini-fab" sloted=[[sloted]]>
        <slot></slot>
      </valle-fab>
    `;
  };

  static get properties() {
    return {
      sloted: {
        type: Boolean,
        valur: false
      },
      label: {
        type: String,
        value: ''
      },
      icon: {
        type: String,
        value: ''
      }
    };
  };

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'listitem');
  };
};

customElements.define('valle-speed-dial-action', ValleSpeedDialAction);
