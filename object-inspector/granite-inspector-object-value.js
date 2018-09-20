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
  createRenderRoot() {
    return this;
  }

  render() {
    return html`${this.markup(this.data, this.closed)}`;
  }

  static get properties() {
    return {
      data: {type: Object},
      closed: {type: Boolean},
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
        if (this.data.constructor.name == 'Object') {
          if (this.closed) {
            return html`<span>{…}</span>`;
          }
          return this._renderObject(this.data);
        }
        return html`<span>${this.data.constructor.name}</span>`;
      case 'function':
        return html`
          <span class='objectValueFunctionKeyword'>function</span>
          <span class='objectValueFunctionName'>&nbsp;${this.data.name}()</span>
        `;
      case 'symbol':
        return html`<span class='objectValueSymbol'>${this.data.toString()}</span>`;
      default:
        return `<span />`;
    }
  }

  _renderObject(object) {
    let propertyNodes = [];
    for (let propertyName in object) {
      if (Object.prototype.hasOwnProperty.call(object, propertyName)) {
        const propertyValue = object[propertyName];
        let ellipsis = '';
        if (propertyNodes.length === this.maxProperties - 1 &&
            Object.keys(object).length > this.maxProperties) {
          ellipsis = html`<span>…</span>`;
        }
        propertyNodes.push(html`
          <granite-inspector-object-name .name=${propertyName}></granite-inspector-object-name>
          <span>:&nbsp;</span>
          <granite-inspector-object-value .data=${propertyValue} closed></granite-inspector-object-value>
          ${ellipsis}`);
        if (ellipsis != '') break;
      }
    }
    if (propertyNodes.length == 0) {
      return html`${this.data.constructor.name} {}`;
    }
    return html`
      <span>{</span>
      ${propertyNodes.map((element, i) =>
          html`${element}${i<propertyNodes.length-1 ? html`<span>,&nbsp;</span>>` : ``}`)}
      <span>}</span>
  `;
  }
}

window.customElements.define('granite-inspector-object-value', GraniteInspectorObjectValue);
