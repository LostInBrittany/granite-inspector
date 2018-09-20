import { html, LitElement } from '@polymer/lit-element';

import './granite-inspector-object-name';
import './granite-inspector-object-preview';

class GraniteInspectorObjectRootLabel extends LitElement {
  /**
   * We don't want Shadow DOM for this element
   * See https://github.com/Polymer/lit-element/issues/42
   * @overrides
   * @return {Object} this
   */
  createRenderRoot() {
    return this;
  }

  render() {
    if (typeof this.name === 'string') {
      return html`
        <granite-inspector-object-name 
            .name=${this.name}></granite-inspector-object-name>
        <span>:&nbsp;</span>
        <granite-inspector-object-preview 
            .data=${this.data}></granite-inspector-object-preview>
      `;
    } else {
      return html`
        <granite-inspector-object-preview 
           .data=${this.data}></granite-inspector-object-preview>
      `;
    }
  }

  static get properties() {
    return {
      data: {type: Object},
      name: {type: String},
    };
  }
}

window.customElements.define('granite-inspector-object-root-label', GraniteInspectorObjectRootLabel);
