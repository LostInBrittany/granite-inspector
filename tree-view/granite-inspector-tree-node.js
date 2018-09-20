import { html, LitElement } from '@polymer/lit-element';


class GraniteInspectorTreeNode extends LitElement {
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
    let expandable = this.shouldShowArrow && this.childTreeNodes.length > 0;
    return html`
      <li 
          ?aria-expanded=${this.expanded} 
          role="treeitem" 
          class='treeNodeBase' 
          @click="${(evt) => this.toggleExpand(evt)}">
        <div  path=${this.path} class="treeNodePreviewContainer clickableNode">
          ${expandable
            ? html`<div class="treeArrow" ?expanded=${this.expanded}>▶</div>`
            : this.shouldShowPlaceholder ? html`<span class="treeNodePlaceholder">&nbsp;</span>` : ''}
          ${this.nodeRenderer(this)}
        </div>
        ${ this.expanded ? html`
          <div>
            ${this.childTreeNodes.length > 0
              ? html`
                <ol role="group" class="treeNodeChildNodesContainer"  ?expanded=${this.expanded}>
                  ${this.childTreeNodes}
                </ol>`
              : ''}
          </div>
          ` : ``}
      </li>
    `;
  }

  static get properties() {
    return {

      /**
       * The Javascript object you would like to inspect
       */
      data: {type: Object},
      /**
       * Specify the optional name of the root node, default to undefined
       */
      name: {type: String},
      /**
       * The current node path
       */
      path: {type: String},
      /**
       * show non-enumerable properties.
       */
      showNonEnumerable: {type: Boolean},
      /**
       * Use a custom nodeRenderer to render the object properties (optional)
       */
      nodeRenderer: {type: Function},
      /**
       * The data iterator
       */
      dataIterator: {type: Function},

      childTreeNodes: {type: Array},
      expanded: {type: Boolean},
      depth: {type: Number},
      shouldShowArrow: {type: Boolean},
      sortObjectKeys: {type: Boolean},
      shouldShowPlaceholder: {type: Boolean},

      onClick: {type: Function},
    };
  }

  constructor() {
    super();
    this.expanded = true;
    this.nodeRenderer = ({name}) => html`
      <span>
        ${name}
      </span>
    `;
    this.shouldShowArrow= false;
    this.shouldShowPlaceholder= true;
  }

  connectedCallback() {
    super.connectedCallback();
  }

  toggleExpand(evt) {
    evt.stopPropagation();
    this.expanded = !this.expanded;
  }
}

window.customElements.define('granite-inspector-tree-node', GraniteInspectorTreeNode);
