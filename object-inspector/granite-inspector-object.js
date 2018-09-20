import { html, LitElement } from '@polymer/lit-element';
import styles from '../styles/createStyles';
import createIterator from '../tools/createIterator';
import defaultNodeRenderer from '../tools/defaultNodeRenderer';
import '../tree-view/granite-inspector-tree-view';

class GraniteInspectorObject extends LitElement {
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
      <style>
        ${styles[this.theme]}
      </style>

      <granite-inspector-tree-view
        .theme=${this.theme}
        .name=${this.name}
        .data=${this.data}
        .expandLevel=${this.expandLevel}
        .expandPath=${this.expandPaths}
        .showNonEnumerable=${this.showNonEnumerable}
        .sortObjectKeys=${this.sortObjectKeys}
        .nodeRenderer=${this.nodeRenderer}
        .dataIterator=${this.dataIterator}></granite-inspector-tree-view>
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
       * The theme, defaults to chromeLight
       */
      theme: {type: String},
      /**
       * An integer specifying to which level the tree should be initially expanded
       */
      expandLevel: {type: Number},
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
      expandPaths: {type: Object},
      /**
       * { Boolean | Function }
       * Sort object keys with optional compare function
       */
      sortObjectKeys: {type: Object},
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
    };
  }

  connectedCallback() {
    super.connectedCallback();
    this.dataIterator = createIterator(this.sortObjectKeys, this.showNonEnumerable);
    this.theme = this.theme || 'chromeLight';
    this.data = (typeof this.data === 'string' ? JSON.parse(this.data) : this.data) || {};
    this.nodeRenderer = this.nodeRenderer || defaultNodeRenderer;
  }
}

window.customElements.define('granite-inspector-object', GraniteInspectorObject);
