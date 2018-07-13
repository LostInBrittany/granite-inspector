import { html, LitElement } from '@polymer/lit-element';

import './granite-inspector-tree-node';

class GraniteInspectorConnectedTreeNode extends LitElement {
  /**
   * We don't want Shadow DOM for this element
   * See https://github.com/Polymer/lit-element/issues/42
   * @overrides
   * @return {Object} this
   */
  _createRoot() {
    return this;
  }

  _render({name, path, data, expanded, depth, dataIterator, nodeRenderer, nodeHasChildNodes, sortObjectKeys, expandedPaths}) {
    return html`
      <granite-inspector-tree-node
            name=${name}
            path=${path}
            data=${data}
            expanded=${expanded}
            depth=${depth}
            childTreeNodes=${dataIterator ? this.generateChildren(data, path) : '' }
            nodeRenderer=${nodeRenderer}
            shouldShowArrow=${nodeHasChildNodes}
            showNonEnumerable=${this.showNonEnumerable}
            sortObjectKeys=${sortObjectKeys}
            shouldShowPlaceholder=${depth > 0} >                    
        </granite-inspector-tree-node>
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

      expandedPaths: Object,
      isNotEnumerable: Boolean,
      expanded: Boolean,
      depth: Number,
      nodeHasChildNodes: Boolean,
    };
  }

  connectedCallback() {
    super.connectedCallback();
  }

  generateChildren(parentData, parentPath) {
    let childTreeNodes = [];
    console.log('[GraniteInspectorConnectedTreeNode] generateChildren - this.dataIterator(parentData)', 
        parentData, this.dataIterator(parentData).next());
    for (let item of this.dataIterator(parentData)) {
      console.log('[GraniteInspectorConnectedTreeNode] generateChildren - for', item);
      let { name, data, isNonEnumerable } = item;
      const key = name;
      const path = `${parentPath}.${key}`;
      childTreeNodes.push(html`
        <granite-inspector-connected-tree-node
            name=${name}
            data=${data}
            depth=${this.depth + 1}
            path=${path}
            shouldShowArrow=${isNonEnumerable || false}
            showNonEnumerable=${this.showNonEnumerable ? this.showNonEnumerable : isNonEnumerable}
            sortObjectKeys=${this.sortObjectKeys}
            dataIterator=${this.dataIterator}
            nodeRenderer=${this.nodeRenderer}></granite-inspector-connected-tree-node>`
      );
    }
    console.log('[GraniteInspectorConnectedTreeNode] generateChildren', childTreeNodes);
    return childTreeNodes;
  }
}
window.customElements.define('granite-inspector-connected-tree-node', GraniteInspectorConnectedTreeNode);
