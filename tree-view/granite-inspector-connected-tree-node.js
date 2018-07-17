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

  _render({name, path, data,
          expanded, depth, dataIterator,
          nodeRenderer, showNonEnumerable,
          sortObjectKeys, expandedPaths}) {
    return html`
      <granite-inspector-tree-node
            name=${name}
            path=${path}
            data=${data}
            expanded=${expandedPaths && !!expandedPaths[path]}
            depth=${depth}
            childTreeNodes=${dataIterator ? this.generateChildren(data, path) : '' }
            nodeRenderer=${nodeRenderer}
            shouldShowArrow=${this.hasChildNodes(data)}
            showNonEnumerable=${showNonEnumerable}
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
       * An integer specifying to which level the tree should be initially expanded
       */
      expandLevel: Number,
      /**
       * { Array<String> | String }
       * An array containing all the paths that should be expanded when the component is initialized,
       * or a string of just one path
       * The path string is similar to JSONPath.
       * It is a dot separated string like $.foo.bar. $.foo.bar expands the path $.foo.bar
       * where $ refers to the root node. Note that it only expands that single node
       * (but not all its parents and the root node). Instead, you should use
       * expandPaths={['$', '$.foo', '$.foo.bar']} to expand all the way to the $.foo.bar node.
       * You can refer to array index paths using ['$', '$.1']
       * You can use wildcard to expand all paths on a specific level
       * For example, to expand all first level and second level nodes, use ['$', '$.*']
       * (equivalent to expandLevel={2}).
       * The results are merged with expandLevel
       */
      expandPaths: Object,
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
    };
  }

  connectedCallback() {
    super.connectedCallback();
    // this.expandedPaths = getExpandedPaths(this.data, this.dataIterator,this.expandedPaths, this.expandLevel);
  }

  hasChildNodes(parentData) {
    if (!this.dataIterator) {
      return false;
    }
    return this.dataIterator(parentData).next().done !== undefined;
  }

  generateChildren(parentData, parentPath) {
    let childTreeNodes = [];
    for (let item of this.dataIterator(parentData)) {
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
            nodeRenderer=${this.nodeRenderer}
            expandedPaths=${this.expandedPaths}></granite-inspector-connected-tree-node>`
      );
    }
    return childTreeNodes;
  }
}
window.customElements.define('granite-inspector-connected-tree-node', GraniteInspectorConnectedTreeNode);
