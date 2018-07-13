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
class GraniteInspectorObjectValue extends LitElement {
  /**
   * We don't want Shadow DOM for this element
   * See https://github.com/Polymer/lit-element/issues/42
   * @overrides
   * @return {Object} this
   */
  _createRoot() {
    return this;
  }

  _render({ data }) {
    return html`
      ${this.markup(data)}
    `;
  }

  static get properties() {
    return {
      data: Object,
    };
  }


  markup() {
    switch (typeof this.data) {
      case 'number':
        return html`<span class='objectValueNumber'>${this.data}</span>`;
      case 'string':
        return html`<span class='objectValueString'>"${this.data}"</span>`;
      case 'boolean':
        return html`<span class='objectValueBoolean'>${String(this.data)}</span>`;
      case 'undefined':
        return html`<span class='objectValueUndefined'>undefined</span>`;
      case 'object':
        if (this.data === null) {
          return html`<span class='objectValueNull'>null</span>`;
        }
        if (this.data instanceof Date) {
          return html`<span>${this.data.toString()}</span>`;
        }
        if (this.data instanceof RegExp) {
          return html`<span class='objectValueRegExp'>${this.data.toString()}</span>`;
        }
        if (this.data instanceof Array) {
          return html`<span>${`Array[${this.data.length}]`}</span>`;
        }
        return html`<span>${this.data.constructor.name}</span>`;
      case 'function':
        return html`
          <span>
            <span class='objectValueFunctionKeyword'>function</span>
            <span class='objectValueFunctionName'>&nbsp;${this.data.name}()</span>
          </span>
        `;
      case 'symbol':
        return html`<span class='objectValueSymbol'>${this.data.toString()}</span>`;
      default:
        return `<span />`;
    }
  }
}

window.customElements.define('granite-inspector-object-value', GraniteInspectorObjectValue);
