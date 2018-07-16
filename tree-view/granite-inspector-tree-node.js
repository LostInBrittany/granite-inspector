import { html, LitElement } from '@polymer/lit-element';


class GraniteInspectorTreeNode extends LitElement {
  /**
   * We don't want Shadow DOM for this element
   * See https://github.com/Polymer/lit-element/issues/42
   * @overrides
   * @return {Object} this
   */
  _createRoot() {
    return this;
  }

  _render({
      path,
      expanded,
      childTreeNodes,
      nodeRenderer,
      shouldShowArrow,
      shouldShowPlaceholder,
  }) {
    let expandable = shouldShowArrow && childTreeNodes.length > 0;
    return html`
      <li aria-expanded$=${expanded} 
          role="treeitem" class='treeNodeBase' 
          on-click="${(evt) => this.toggleExpand(evt)}">
        <div  path=${path} class="treeNodePreviewContainer clickableNode">
          ${expandable
            ? html`<div class="treeArrow" expanded?=${expanded}>▶</div>`
            : shouldShowPlaceholder ? html`<span class="treeNodePlaceholder">&nbsp;</span>` : 'FUCK'}
          ${nodeRenderer(this)}
        </div>
        <div>
          ${childTreeNodes.length > 0
            ? html`
              <ol role="group" class="treeNodeChildNodesContainer"  expanded?=${expanded}>
                ${childTreeNodes}
              </ol>`
            : ''}
        </div>
      </li>
    `;
  }

  static get properties() {
    return {

      /**
       * The Javascript object you would like to inspect
       */
      data: Object,
      /**
       * Specify the optional name of the root node, default to undefined
       */
      name: String,
      /**
       * The current node path
       */
      path: String,
      /**
       * show non-enumerable properties.
       */
      showNonEnumerable: Boolean,
      /**
       * Use a custom nodeRenderer to render the object properties (optional)
       */
      nodeRenderer: Function,
      /**
       * The data iterator
       */
      dataIterator: Function,

      childTreeNodes: Array,
      expanded: Boolean,
      depth: Number,
      shouldShowArrow: Boolean,
      sortObjectKeys: Boolean,
      shouldShowPlaceholder: Boolean,

      onClick: Function,
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
