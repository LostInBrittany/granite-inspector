import {html, LitElement} from '@polymer/lit-element';

import styles from './styles/createStyles';

import './tree-view/granite-inspector-arrow';

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
      <h2>Hello inspector!</h2>
      <granite-inspector-arrow></granite-inspector-arrow>
      <granite-inspector-arrow expanded></granite-inspector-arrow>
      <granite-inspector-arrow expanded="true"></granite-inspector-arrow>
    `;
  }
  static get properties() {
    return {
      prop1: String,
    };
  }
}

window.customElements.define('granite-inspector', GraniteInspector);
