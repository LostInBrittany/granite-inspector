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
  _createRoot() {
    return this;
  }

  _render({name, data, isNonEnumerable}) {
    return html`
      <granite-inspector-object-name 
          name=${name} 
          dimmed=${isNonEnumerable}></granite-inspector-object-name>
      <span>:&nbsp;</span>
      <granite-inspector-object-value 
          data=${data}></granite-inspector-object-value>
    `;
  }

  static get properties() {
    return {
      data: Object,
      name: String,
      isNonEnumerable: Boolean,
    };
  }
}

window.customElements.define('granite-inspector-object-label', GraniteInspectorObjectLabel);
