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

  _render({ data, closed }) {
    return html`
      ${this.markup(data, closed)}
    `;
  }

  static get properties() {
    return {
      data: Object,
      closed: Boolean,
    };
  }


  markup() {
    switch (typeof this.data) {
      case 'number':
        return html`<div class='objectValueNumber'>${this.data}</div>`;
      case 'string':
        return html`<div class='objectValueString'>"${this.data}"</div>`;
      case 'boolean':
        return html`<div class='objectValueBoolean'>${String(this.data)}</div>`;
      case 'undefined':
        return html`<div class='objectValueUndefined'>undefined</div>`;
      case 'object':
        if (this.data === null) {
          return html`<div class='objectValueNull'>null</div>`;
        }
        if (this.data instanceof Date) {
          return html`<div>${this.data.toString()}</div>`;
        }
        if (this.data instanceof RegExp) {
          return html`<div class='objectValueRegExp'>${this.data.toString()}</div>`;
        }
        if (this.data instanceof Array) {
          return html`<div>${`Array[${this.data.length}]`}</div>`;
        }
        if (this.data.constructor.name == 'Object') {
          if (this.closed) {
            return html`<div>{…}</div>`;
          }
          return this._renderObject(this.data);
        }
        return html`<div>${this.data.constructor.name}</div>`;
      case 'function':
        return html`
          <div>
            <div class='objectValueFunctionKeyword'>function</div>
            <div class='objectValueFunctionName'>&nbsp;${this.data.name}()</div>
          </div>
        `;
      case 'symbol':
        return html`<div class='objectValueSymbol'>${this.data.toString()}</div>`;
      default:
        return `<div />`;
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
          ellipsis = html`<div>…</div>`;
        }
        propertyNodes.push(html`
        <div>
          <granite-inspector-object-name name=${propertyName}></granite-inspector-object-name>:&nbsp;
          <granite-inspector-object-value data=${propertyValue} closed></granite-inspector-object-value>
          ${ellipsis}
        </div>`);
        if (ellipsis != '') break;
      }
    }
    return html`
    <div>
      {${propertyNodes.map((element, i) => html`${element}${i<propertyNodes.length-1 ? html`,&nbsp;` : ``}`)}}
    </div>
  `;
  }
}

window.customElements.define('granite-inspector-object-value', GraniteInspectorObjectValue);
