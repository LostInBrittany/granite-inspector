import { html } from '@polymer/lit-element';

const defaultNodeRenderer = ({ depth, name, data, isNonEnumerable }) => {
    return html`
      ${depth === 0 ?
        html`<granite-inspector-object-root-label name=${name} data=${data}></granite-inspector-object-root-label>` :
        html`
        <granite-inspector-object-label name=${name} data=${data} isNonEnumerable=${isNonEnumerable}>        
        </granite-inspector-object-label>
        `
      }
    `;
  };

export default defaultNodeRenderer;
