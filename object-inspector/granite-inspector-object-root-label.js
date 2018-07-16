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
  _createRoot() {
    return this;
  }

  _render({name, data}) {
    if (typeof name === 'string') {
      return html`
        <span>
          <granite-inspector-object-name 
              name=${name}></granite-inspector-object-name>
          <span>:&nbsp;</span>
          <granite-inspector-object-preview 
              data=${data}></granite-inspector-object-preview>
        </span>
      `;
    } else {
      return html`
        <granite-inspector-object-preview 
            data=${data}></granite-inspector-object-preview>
      `;
    }
  }

  static get properties() {
    return {
      data: Object,
      name: String,
    };
  }
}

window.customElements.define('granite-inspector-object-root-label', GraniteInspectorObjectRootLabel);
