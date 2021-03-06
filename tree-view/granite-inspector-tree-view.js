import { html, LitElement } from '@polymer/lit-element';

import './granite-inspector-connected-tree-node';
import {getExpandedPaths} from '../tools/pathUtils';

class GraniteInspectorTreeView extends LitElement {
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
    <granite-inspector-connected-tree-node
        .name=${this.name}
        .data=${this.data}
        .depth=${0}
        .path=${this.DEFAULT_ROOT_PATH}
        .showNonEnumerable=${this.showNonEnumerable}
        .sortObjectKeys=${this.sortObjectKeys}
        .dataIterator=${this.dataIterator}
        .nodeRenderer=${this.nodeRenderer}
        .expandedPaths=${getExpandedPaths(this.data,this.dataIterator,this.expandPaths,this.expandLevel)}></granite-inspector-connected-tree-node>
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
       * A function to iterate data
       */
      dataIterator: {type: Function},

    };
  }

  constructor() {
    super();
    this.DEFAULT_ROOT_PATH = '$';
    this. WILDCARD = '*';
  }

  connectedCallback() {
    super.connectedCallback();
    this.getExpandedPaths();
  }

  hasChildNodes(data) {
    return this.dataIterator && !this.dataIterator(data).next().done;
  }


  wildcardPathsFromLevel(level) {
    // i is depth
    return Array.from({ length: level }, (_, i) => {
      return [this.DEFAULT_ROOT_PATH].concat(Array.from({ length: i }, () => '*')).join('.');
    });
  }

  getExpandedPaths() {
    let wildcardPaths = []
      .concat(this.wildcardPathsFromLevel(this.expandLevel))
      .concat(this.expandPaths)
      .filter((path) => typeof path === 'string'); // could be undefined

    const expandedPaths = [];
    wildcardPaths.forEach((wildcardPath) => {
      const keyPaths = wildcardPath.split('.');
      const populatePaths = (curData, curPath, depth) => {
        if (depth === keyPaths.length) {
          expandedPaths.push(curPath);
          return;
        }
        const key = keyPaths[depth];
        if (depth === 0) {
          if (
            this.hasChildNodes(curData) &&
            (key === this.DEFAULT_ROOT_PATH || key === this.WILDCARD)
          ) {
            populatePaths(curData, this.DEFAULT_ROOT_PATH, depth + 1);
          }
        } else {
          if (key === this.WILDCARD) {
            for (let { name, data } of this.dataIterator(curData)) {
              if (this.hasChildNodes(data)) {
                populatePaths(data, `${curPath}.${name}`, depth + 1);
              }
            }
          } else {
            const value = curData[key];
            if (this.hasChildNodes(value, this.dataIterator)) {
              populatePaths(value, `${curPath}.${key}`, depth + 1);
            }
          }
        }
      };

      populatePaths(this.data, '', 0);
    });

    this.expandedPaths = expandedPaths.reduce((obj, path) => {
      obj[path] = true;
      return obj;
    }, {});
  }
}

window.customElements.define('granite-inspector-tree-view', GraniteInspectorTreeView);
