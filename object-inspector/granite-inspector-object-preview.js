import { html, LitElement } from '@polymer/lit-element';


import './granite-inspector-object-name';
import './granite-inspector-object-value';

/**
 * A view for object property names.
 *
 * If the property name is enumerable (in Object.keys(object)),
 * the property name will be rendered normally.
 *
 * If the property name is not enumerable (`Object.prototype.propertyIsEnumerable()`),
 * the property name will be dimmed to show the difference.
 */
class GraniteInspectorObjectPreview extends LitElement {
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
      ${this.markup(this.data)}
    `;
  }

  static get properties() {
    return {
      data: {type: Object},
      maxProperties: {type: Number},
    };
  }

  constructor() {
    super();
    this.maxProperties = 3;
  }


  markup() {
    if (typeof this.data !== 'object' ||
        this.data === null ||
        this.data instanceof Date ||
        this.data instanceof RegExp) {
      return html`<granite-inspector-object-value .data=${this.data}></granite-inspector-object-value>`;
    }

    if (this.data instanceof Array) {
      return html`        
          <span>(${this.data.length}) [</span>
          ${
            html`${
              this.data.map((element, i) => {
                return html`
                  <granite-inspector-object-value .data=${element}></granite-inspector-object-value>
                  ${i<this.data.length-1 ? html`<span>,&nbsp;</span>` : ``}
                `;
              })
            }`
          }
          ]
      `;
    } else if (typeof this.data === 'string') {
      return html`<granite-inspector-object-value .data='${this.data}' ></granite-inspector-object-value>`;
    } else {
      let propertyNodes = [];
      for (let propertyName in this.data) {
        if (Object.prototype.hasOwnProperty.call(this.data, propertyName)) {
          const propertyValue = this.data[propertyName];
          let ellipsis = '';
          if (propertyNodes.length === this.maxProperties - 1 &&
              Object.keys(this.data).length > this.maxProperties) {
            ellipsis = html`<span>…</span>`;
          }
          propertyNodes.push(html`
            <granite-inspector-object-name .name=${propertyName}></granite-inspector-object-name>:&nbsp;
            <granite-inspector-object-value .data=${propertyValue}></granite-inspector-object-value>
            ${ellipsis}`);
          if (ellipsis != '') break;
        }
      }
      if (propertyNodes.length == 0) {
        return html`${this.data.constructor.name} {}`;
      }
      return html`
        <span>
          ${this.data.constructor.name} 
          {${propertyNodes.map((element, i) => html`${element}${i<propertyNodes.length-1 ? html`,&nbsp;` : ``}`)}} 
        </span>
      `;
    }
  }
}

window.customElements.define('granite-inspector-object-preview', GraniteInspectorObjectPreview);
