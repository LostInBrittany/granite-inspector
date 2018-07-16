# \<granite-inspector\>

A custom element, [lit-element](https://github.com/Polymer/lit-element) based, version of [react-inspector](https://github.com/xyc/react-inspector/)


Power of [Browser DevTools](https://developers.google.com/web/tools/chrome-devtools/) inspectors right as a custom element.

> ## 🛠 Status: In Development
> `granite-inspector` is currently in development. We encourage you to use it and give us your feedback, but there are things that haven't been finalized yet and you can expect some changes.


[![Published on npm](https://img.shields.io/npm/v/@granite-elements/granite-inspector.svg)](https://www.npmjs.com/package/@granite-elements/granite-inspector)
[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/@granite-elements/granite-inspector)




## Usage example

<!---
```
<custom-element-demo>
  <template>
    <script src="../webcomponentsjs/webcomponents-lite.js"></script>
    <script src="./granite-inspector.js" type="module">
    <next-code-block></next-code-block>
  </template>
</custom-element-demo>
```
-->
```html
  <granite-object-inspector data='["a", "b", { "c": "d", "e": "f", "g": { "h": "i", "j": "k"}}]'></granite-object-inspector>
```


## Install


Install the component using [npm](https://www.npmjs.com/):

```sh
$ npm i @granite-elements/ace-widget --save
```

Once installed, import it in your application:

import '@granite-elements/ace-widget/ace-widget.js';



## Running demos and tests in browser

1. Fork the `ace-widget` repository and clone it locally.

1. Make sure you have [npm](https://www.npmjs.com/) 
and the [Polymer CLI](https://www.polymer-project.org/3.0/docs/tools/polymer-cli) installed.

1. When in the `ace-widget` directory, run `npm install` to install dependencies.

1. Serve the project using Polyumer CLI:

    `polymer serve --module-resolution node --component-dir node_modules`

1. Open the demo in the browser

    - http://127.0.0.1:8080/components/@greanite-elements/ace-widget/demo



## Elements

### &lt;granite-inspector />
A shorthand for the inspectors.

- `<granite-inspector/>` is currently equivalent to `<granite-inspector-object>`
- DOM and table mode are under active development

### &lt;granite-inspector-object />
Like `console.log`. Consider this as a glorified version of `<pre>JSON.stringify(data, null, 2)</pre>`.

###### How it works
Tree state is saved at root. If you click to expand some elements in the hierarchy, the state will be preserved after the element is unmounted.

#### API
The component accepts the following props:

#### `data {Object}`: the Javascript object you would like to inspect

#### `name {String}`: specify the optional name of the root node, default to `undefined`

#### `expandLevel {Number}`: an integer specifying to which level the tree should be initially expanded.

#### `expandPaths {String|Array}`: an array containing all the paths that should be expanded when the component is initialized, or a string of just one path
- The path string is similar to [JSONPath](http://goessner.net/articles/JsonPath/).
  - It is a dot separated string like `$.foo.bar`. `$.foo.bar` expands the path `$.foo.bar` where `$` refers to the root node. Note that it only expands that single node (but not all its parents and the root node). Instead, you should use `expandPaths={['$', '$.foo', '$.foo.bar']}` to expand all the way to the `$.foo.bar` node.
  - You can refer to array index paths using `['$', '$.1']`
  - You can use wildcard to expand all paths on a specific level
    - For example, to expand all first level and second level nodes, use `['$', '$.*']` (equivalent to `expandLevel={2}`)
- the results are merged with expandLevel

#### `showNonenumerable {Boolean}`: show non-enumerable properties.

#### `sortObjectKeys {Boolean|Function}`: Sort object keys with optional compare function.

#### `nodeRenderer {Function}`: Use a custom `nodeRenderer` to render the object properties (optional)
- Instead of using the default `nodeRenderer`, you can provide a
  custom function for rendering object properties. The _default_
  nodeRender looks like this:

  ```javascript
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
  ```


## Theme
By specifying the `theme` prop you can customize the inspectors. `theme` prop can be

1. a string referring to a preset theme (`"chromeLight"` or `"chromeDark"`, default to `"chromeLight"`)
2. or a custom object that provides the necessary variables. Checkout `src/styles/themes` for possible theming variables.

Example 1: Using a preset theme:
```js
<granite-inspector theme="chromeDark" data='{"a": "a", "b": "b"}'></granite-inspector>
```

## Roadmap
Type of inspectors:
- [x] Tree style
  - [x] common objects
  - [ ] DOM nodes
- [ ] Table style
  - [ ] Column resizer
- [ ] Group style


## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## License

[MIT License](http://opensource.org/licenses/MIT)



