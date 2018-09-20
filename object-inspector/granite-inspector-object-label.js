import { html, LitElement } from '@polymer/lit-element';

import './granite-inspector-object-name';
import './granite-inspector-object-value';

class GraniteInspectorObjectLabel extends LitElement {
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
    return html`
      <granite-inspector-object-name 
          .name=${this.name} 
          .dimmed=${this.isNonEnumerable}></granite-inspector-object-name>
      <span>:&nbsp;</span>
      <granite-inspector-object-value 
          .data=${this.data}></granite-inspector-object-value>
    `;
  }

  static get properties() {
    return {
      data: {type: Object},
      name: {type: String},
      isNonEnumerable: {type: Boolean},
    };
  }
}

window.customElements.define('granite-inspector-object-label', GraniteInspectorObjectLabel);
