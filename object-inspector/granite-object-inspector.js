import { html, LitElement } from '@polymer/lit-element';
import styles from '../styles/createStyles';
import '../tree-view/granite-inspector-tree-view';
import './granite-inspector-object-label';
import './granite-inspector-object-root-label';

const defaultNodeRenderer = ({ depth, name, data, isNonEnumerable }) => {
  return html`
    ${depth === 0 ?
      html`<granite-inspector-object-root-label 
          name=${name} data=${data}></granite-inspector-object-root-label>` :
      html`
        <granite-inspector-object-label 
            name=${name} data=${data} isNonEnumerable=${isNonEnumerable}></granite-inspector-object-label>`
    }
  `;
};


class GraniteObjectInspector extends LitElement {
  /**
   * We don't want Shadow DOM for this element
   * See https://github.com/Polymer/lit-element/issues/42
   * @overrides
   * @return {Object} this
   */
  _createRoot() {
    return this;
  }

  _render({ data, name, theme,
            expandLevel, expandPaths, sortObjectKeys,
            showNonEnumerable, nodeRenderer, dataIterator }) {
    return html`
      <style>
        ${styles[theme]}
      </style>

      <granite-inspector-tree-view
        theme=${theme}
        name=${name}
        data=${data}
        expandLevel=${expandLevel}
        expandPath=${expandPaths}
        showNonEnumerable=${showNonEnumerable}
        sortObjectKeys=${sortObjectKeys}
        nodeRenderer=${nodeRenderer}
        dataIterator=${dataIterator}></granite-inspector-tree-view>
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
       * The theme, defaults to chromeLight
       */
      theme: String,
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
       * { Boolean | Function }
       * Sort object keys with optional compare function
       */
      sortObjectKeys: Object,
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
    };
  }

  connectedCallback() {
    super.connectedCallback();
    this.createIterator();
    this.theme = this.theme || 'chromeLight';
    this.data = (typeof this.data === 'string' ? JSON.parse(this.data) : this.data) || {};
    this.nodeRenderer = this.nodeRenderer || defaultNodeRenderer;
  }


  createIterator() {
    let sortObjectKeys = this.sortObjectKeys;
    let showNonEnumerable = this.showNonEnumerable;
    const objectIterator = function* (data) {
      const shouldIterate = (typeof data === 'object' && data !== null) || typeof data === 'function';
      if (!shouldIterate) {
        return;
      }

      // iterable objects (except arrays)
      if (Array.isArray(data)) {
        let i = 0;
        for (let entry of data) {
          if (Array.isArray(entry) && entry.length === 2) {
            const [k, v] = entry;
            yield {
              name: k,
              data: v,
            };
          } else {
            yield {
              name: i.toString(),
              data: entry,
            };
          }
          i++;
        }
      } else {
        const keys = Object.getOwnPropertyNames(data);
        if (sortObjectKeys === true) {
          keys.sort();
        } else if (typeof sortObjectKeys === 'function') {
          keys.sort(sortObjectKeys);
        }

        for (let propertyName of keys) {
          if (data.propertyIsEnumerable(propertyName)) {
            const propertyValue = data[propertyName];
            yield {
              name: propertyName || `""`,
              data: propertyValue,
            };
          } else if (showNonEnumerable) {
            // To work around the error (happens some time when propertyName === 'caller' ||
            // propertyName === 'arguments') 'caller' and 'arguments' are restricted function
            // properties and cannot be accessed in this context
            // http://stackoverflow.com/questions/31921189/caller-and-arguments-are-restricted-function-properties-and-cannot-be-access
            let propertyValue;
            try {
              propertyValue = data[propertyName];
            } catch (e) {
              // console.warn(e)
            }

            if (propertyValue !== undefined) {
              yield {
                name: propertyName,
                data: propertyValue,
                isNonenumerable: true,
              };
            }
          }
        }

        // [[Prototype]] of the object: `Object.getPrototypeOf(data)`
        // the property name is shown as "__proto__"
        if (showNonEnumerable && data !== Object.prototype /* already added */) {
          yield {
            name: '__proto__',
            data: Object.getPrototypeOf(data),
            isNonEnumerable: true,
          };
        }
      }
    };

    this.dataIterator = objectIterator;
  }
}

window.customElements.define('granite-object-inspector', GraniteObjectInspector);
