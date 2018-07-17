import { html, LitElement } from '@polymer/lit-element';

/**
 * A view for object property names.
 *
 * If the property name is enumerable (in Object.keys(object)),
 * the property name will be rendered normally.
 *
 * If the property name is not enumerable (`Object.prototype.propertyIsEnumerable()`),
 * the property name will be dimmed to show the difference.
 */
class GraniteInspectorObjectName extends LitElement {
  /**
   * We don't want Shadow DOM for this element
   * See https://github.com/Polymer/lit-element/issues/42
   * @overrides
   * @return {Object} this
   */
  _createRoot() {
    return this;
  }

  _render({name, dimmed}) {
    return html`<span dimmed$=${dimmed}>${name}</span>`;
  }

  static get properties() {
    return {
      name: String,
      dimmed: Boolean,
    };
  }
}

window.customElements.define('granite-inspector-object-name', GraniteInspectorObjectName);
