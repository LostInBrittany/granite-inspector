import {html, LitElement} from '@polymer/lit-element';

import styles from './styles/createStyles';

console.dir(styles)
/**
 * `granite-inspector`
 * A lit-element based version of react-inspector
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class GraniteInspector extends LitElement {
  _render() {
    return html`
      <style>
        ${styles['chromeLight']}
      </style>
      <h2>Hello [[prop1]]!</h2>
    `;
  }
  static get properties() {
    return {
      prop1: String,
    };
  }
}

window.customElements.define('granite-inspector', GraniteInspector);
