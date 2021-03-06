import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@valle/valle-fab/valle-fab.js';

export default class ValleSpeedDial extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: inline-block;
          position: relative;
        }

        .fab {
          position: relative;
          z-index: 2;
          --valle-fab-color: var(--valle-speed-dial-fab-color, #00b0ba);
          --valle-fab-default-icon-color: var(--valle-speed-dial-default-icon-color, #ffffff);
          --valle-fab-pressed-color: var(--valle-speed-dial-pressed-color, #00676d);
        }

        .speed-dial {
          padding-left: 0;
          margin-top: 0;
          margin-bottom: 0;
          position: absolute;
          z-index: 3;
          right: 8px;
          bottom: 70px; /* direction up - Default value*/
          display: flex;
          flex-direction: column;
        }

        :host([direction="down"]) .speed-dial {
          top: 70px;
        }

        :host([direction="up"]) .speed-dial {
          bottom: 70px;
        }

        :host([direction="left"]) .speed-dial {
          top: 10px;
          right: 70px;
          flex-direction: row;
        }

        :host([direction="right"]) .speed-dial {
          top: 10px;
          left: 70px;
          display: flex;
          flex-direction: row;
        }

        :host(.backdrop[backdrop])::after {
          content: '';
          position: fixed;
          z-index: 1;
          top: 0;
          left: 0;
          display: block;
          width: 100vw;
          height: 100vh;
          background-color: var(--valle-speed-dial-backdrop-color, rgba(0,0,0,.8));
          animation: fade .2s;
        }

        @keyframes fade {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        };
      </style>

      <valle-fab
        toggle
        icon=[[icon]]
        label=[[label]]
        aria-haspopup="true"
        class="fab"
        id="fab">
      </valle-fab>

      <ul class="speed-dial" id="speedDial" style="display: none;">
        <slot></slot>
      </ul>
    `;
  };

  static get properties() {
    return {
      label: {
        type: String,
        value: ''
      },
      icon: {
        type: String,
        value: ''
      },
      open: {
        type: Boolean,
        value: false,
        observer: '_openToggleObserver',
        reflectToAttribute: true
      },
      backdrop: {
        type: Boolean,
        value: false
      }
    };
  };
  
  connectedCallback() {
    super.connectedCallback();

    this.setAttribute('role', 'navigation');
    this.$.fab.addEventListener('click', this._toggleShow.bind(this));

  };

  _toggleShow() {

    this.$.speedDial.style.display === 'none'
      ? this.setAttribute('open', '')
      : this.removeAttribute('open');

  };

  _openToggleObserver( newBooleanValue ) {

    if ( newBooleanValue ) {
      this.$.fab.setAttribute('pressed', '');
      this.$.speedDial.style.display = 'flex';
      this.classList.add('backdrop');
    } else {
      this.$.fab.removeAttribute('pressed');
      this.$.speedDial.style.display = 'none';
      this.classList.remove('backdrop');
    }

  };
};

customElements.define('valle-speed-dial', ValleSpeedDial);
